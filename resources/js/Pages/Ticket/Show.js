import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import { Divider, Flex, Spacer, Textarea, Button, Text, Box, Stack, IconButton, Tag, Menu, MenuButton, MenuList, MenuItem, useToast, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { Activity, Calendar, ChevronDown, Clock, Edit, Info, Send, Share2, Upload } from 'react-feather';
import User from '@/Components/User';
import LastSeen from '@/Components/LastSeen';
import { copyTextToClipboard } from '@/Helpers/clipboard';
import { Inertia } from '@inertiajs/inertia';

const sampleActivityData = [
    {
        eventType: "CREATION",
        date: (new Date()).setMinutes(-100),
        user: {
            displayName: "Maximilien Gilet"
        }
    },
    {
        eventType: "TYPE_CHANGE",
        type: "improvement",
        date: (new Date()).setMinutes(-60),
        user: {
            displayName: "Maximilien Gilet"
        }
    },
    {
        eventType: "PRIORITY_CHANGE",
        priority: "low",
        date: (new Date()).setMinutes(-50),
        user: {
            displayName: "Maximilien Gilet"
        }
    },
    {
        eventType: "UPDATE",
        date: (new Date()).setMinutes(-1),
        user: {
            displayName: "Fake Customer"
        }
    },
]

const InfoBlock = ({ title, body, isInline = false, isBodyMuted = false }) => {
    if (isInline) {
        return (
            <section className='p-4'>
                <Flex align="baseline">
                    <Text flex={1} className='font-semibold' fontSize="small" color="gray">{title}</Text>
                    <Text flex={1} className='font-semibold'>{body}</Text>
                </Flex>
            </section>
        )
    }

    return (
        <section className='p-4'>
            <Text className='mb-2 font-semibold ' color="gray">{title}</Text>
            <Text className='font-semibold' fontSize={isBodyMuted ? "sm" : null} color={isBodyMuted ? "gray.400" : null}>{body}</Text>
        </section>);
};

const ActivityLine = ({ ticketEvent }) => {
    let text;
    let additionalData;
    switch (ticketEvent.eventType) {
        case "CREATION":
            text = "a créé ce ticket";
            break;
        case "TYPE_CHANGE":
            text = "a changé le type en";
            additionalData = (<Tag>{ticketEvent.type}</Tag>);
            break;
        case "PRIORITY_CHANGE":
            text = "a changé la priorité en";
            additionalData = (<Tag>{ticketEvent.priority}</Tag>);
            break;
        case "UPDATE":
            text = "a mis à jour le ticket";
            break;
        default:
            break;
    }

    return (
        <Flex align="center" justify="start" className='mb-6'>
            <>
                <User size="sm" displayName={ticketEvent.user.displayName} />
                <Text color="gray" className='ml-1'>{text}</Text>
                {additionalData && (<Text className='ml-1'>{additionalData}</Text>)}
            </>
            <Spacer />
            <LastSeen date={ticketEvent.date} />
        </Flex>
    )
}

export default function TicketShow(props) {

    // console.log(props);

    const [comment, setComment] = React.useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const onClose = () => setIsDeleteModalOpen(false);
    const cancelRef = React.useRef();
    const toast = useToast();

    const onDelete = () => {
        Inertia.delete(route('tickets.destroy', props.ticket.id));
    }

    const handleShare = (e) => {
        e.preventDefault;
        copyTextToClipboard(window.location.href);
        toast({
            title: "Lien copié dans le presse-papier",
            status: "success"
        })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <>
                    <h2 className="font-bold text-xl text-gray-800 leading-tight">{props.ticket.title}</h2>
                    <Flex align="center">
                        <Stack spacing={3} direction="row" align="center">
                            <Tag>Tag</Tag>
                            <Tag>improvement</Tag>
                            <Tag>todo</Tag>
                            <div><Calendar size={16} /> Création : <LastSeen date={(new Date).setHours(-80)} /></div>
                        </Stack>
                        <Spacer />
                        <Stack spacing={3} direction="row">
                            <Button leftIcon={<Share2 size={16} />} variant="outline" colorScheme="blackAlpha" onClick={handleShare}>Partager</Button>
                            <Button leftIcon={<Clock size={16} />} variant="solid" colorScheme="green">Pris en charge</Button>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDown size={16} />}>
                                    Actions
                                </MenuButton>
                                <MenuList>
                                    <Link href={route("tickets.edit", props.ticket.id)}><MenuItem >Modifier</MenuItem></Link>
                                    <MenuItem onClick={() => setIsDeleteModalOpen(true)}>Supprimer</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                    <AlertDialog
                        isOpen={isDeleteModalOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Supprimer le ticket
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Confirmer la suppression du ticket ?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Annuler
                                    </Button>
                                    <Button colorScheme='red' onClick={onDelete} ml={3}>
                                        Supprimer
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
            }

        >
            <Head title={`${props.ticket.title} | Details ticket`} />

            <div className="py-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" overflow-hidden sm:rounded-lg">
                        <div className="p-6 pt-0">
                            <Flex direction={{ sm: "column-reverse", lg: "row" }}>
                                <Box flex="4" marginRight={{ sm: 0, lg: 2 }}>
                                    <Text fontSize="xl" className='mt-8 mb-4 font-semibold '><Activity /> Activités</Text>
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4">
                                        <div className="p-3 bg-white border-b border-gray-200">
                                            {sampleActivityData.map((ticketEvent, index) => (
                                                <ActivityLine
                                                    ticketEvent={ticketEvent}
                                                    key={index}
                                                />
                                            ))}
                                            <Textarea colorScheme="blackAlpha" onChange={(e) => setComment(e.target.value)} placeholder='Votre commentaire' />
                                        </div>
                                        <div className='p-3 bg-gray-100'>
                                            <Button className='mr-2' colorScheme="teal" variant="solid" disabled={comment == ""} leftIcon={<Send size={16} />} >Commenter</Button>
                                            <Button leftIcon={<Upload size={16} />} variant="outline" colorScheme="blackAlpha">Envoyer un fichier</Button>
                                        </div>
                                    </div>
                                </Box>
                                <Box flex='3' marginLeft={{ sm: 0, lg: 2 }}>
                                    <Text className='mt-8 mb-4 font-semibold' fontSize="xl"><Info /> Informations</Text>
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4">
                                        <div className="p-3 bg-white border-b border-gray-200">
                                            <Stack direction='row' spacing={2} align='stretch'>
                                                <Button colorScheme='teal' variant='solid' isFullWidth={true}>
                                                    Créer une tâche
                                                </Button>
                                                <Button colorScheme='teal' variant='outline' isFullWidth={true}>
                                                    Assigner à une tâche
                                                </Button>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className=" border-b border-gray-200">
                                            <section className='p-4'>
                                                <Flex align="center">
                                                    <Text className='mb-2 font-semibold ' color="gray">Client notifié</Text>
                                                    <Spacer />
                                                    <Link href={route("tickets.edit", props.ticket.id)}>
                                                        <IconButton
                                                            // size="sm"
                                                            variant='outline'
                                                            icon={<Edit size={20} />}
                                                        />
                                                    </Link>
                                                </Flex>
                                                <User displayName="Maximilien Gilet" email="maximilien.gilet@protonmail.com" />
                                            </section>
                                            <Divider marginTop={2} marginBottom={2} />
                                            <InfoBlock title="Description" body={props.ticket.description} />
                                            <Divider marginTop={2} marginBottom={2} />
                                            <InfoBlock title="Page concernée" body="Pas de lien précisé" isBodyMuted />
                                            <Divider marginTop={2} marginBottom={2} />
                                            <InfoBlock title="Navigateur" body="Chrome" isInline />
                                            <Divider marginTop={2} marginBottom={2} />
                                            <InfoBlock title="Système d'exploitation" body="macOS" isInline />
                                            <Divider marginTop={2} marginBottom={2} />
                                            <InfoBlock title="Pièces jointes" body="Aucune pièce jointe ajoutée." isBodyMuted />
                                        </div>
                                    </div>
                                </Box>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

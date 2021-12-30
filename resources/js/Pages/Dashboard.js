import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import {
    Button,
    Flex,
    Spacer,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Text,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Eye, Plus } from "react-feather";
import LastSeen from "@/Components/LastSeen";
import { useTable, useSortBy } from "react-table";
import User from "@/Components/User";
import { flatten } from "@/Helpers/utils";
import PriorityIcon from "@/Components/PriorityIcon";
import TicketType from "@/Components/TicketType";

export default function Dashboard(props) {
    const data = React.useMemo(
        () => props.tickets.map((ticket) => flatten(ticket, "_")),
        []
    );

    console.log(data);

    const columns = React.useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                Cell: ({ row }) => (
                    <Link href={route('tickets.show', row.original.id)}><Text color="teal">{row.original.id}</Text></Link>
                )
            },
            {
                Header: "Type",
                accessor: "type_name",
                Cell: ({ row }) => (
                    <TicketType type={row.original['type_name']} />
                )
            },
            {
                Header: "Titre",
                accessor: "title",
            },
            {
                Header: "Priorité",
                accessor: "priority_name",
                Cell: ({ row }) => (
                    <PriorityIcon priority={row.original["priority_name"]} size={20} />
                )
            },
            {
                Header: "Créateur",
                Cell: ({ row }) => (
                    <User
                        displayName={row.original["author_name"]}
                        email={row.original["author_email"]}
                        size="sm"
                    />
                ),
            },
            {
                Header: "Dernière modification",
                Cell: ({ row }) => (
                    <LastSeen
                        title={row.original.updated_at.toString()}
                        date={row.original.updated_at.toString()}
                    />
                ),
            },
            {
                accessor: "active",
                Cell: ({ row }) => (
                    <Link href={route('tickets.show', row.original.id)}>
                        <Button variant="outline" leftIcon={<Eye size={16} />}>Consulter</Button>
                    </Link>
                )
            }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <Flex>
                        <Center>Dashboard tickets</Center>
                        <Spacer />
                        <Link href={route("tickets.create")}>
                            <Button
                                leftIcon={<Plus />}
                                colorScheme="teal"
                                variant="solid"
                            >
                                Nouveau ticket
                            </Button>
                        </Link>
                    </Flex>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" bg-white border-b border-gray-200">
                            <Table {...getTableProps()}>
                                <Thead>
                                    {headerGroups.map((headerGroup) => (
                                        <Tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <Th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                        isNumeric={
                                                            column.isNumeric
                                                        }
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                        <chakra.span pl="4">
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                                ) : (
                                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                                )
                                                            ) : null}
                                                        </chakra.span>
                                                    </Th>
                                                )
                                            )}
                                        </Tr>
                                    ))}
                                </Thead>
                                <Tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <Tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <Td
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

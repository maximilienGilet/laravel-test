import { Avatar, Flex, Text } from "@chakra-ui/react";

const User = ({ displayName, email = null, photo = null, size = "md", ...props }) => (
  <Flex align="center" {...props}>
    <Avatar name={displayName} size={size} src={photo} className="mr-2" />
    <div>
      <Text className="font-semibold">{displayName}</Text>
      {email && (<Text fontSize="sm" color="gray">{email}</Text>)}
    </div>
  </Flex>
);

export default User;
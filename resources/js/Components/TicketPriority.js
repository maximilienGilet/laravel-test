import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PriorityIcon from "./PriorityIcon";
import { getPriorityColor } from "@/Helpers/colors";

const TicketPriority = ({ priority }) => {
  const { t } = useTranslation();

  const color = getPriorityColor(priority);

  return (
    <Tag variant="outline" colorScheme={color}>
      <PriorityIcon priority={priority} size={14} />
      &nbsp;
      <TagLabel>{t(priority)}</TagLabel>
    </Tag>
  )
};

export default TicketPriority;
import { Tag } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TicketType = ({ type }) => {
  const { t } = useTranslation();

  let color;

  switch (type) {
    case "bug":
      color = "red";
      break;
    case "feature_request":
      color = "blue";
      break;
    case "improvement_idea":
      color = "green"
  }

  return (
    <Tag variant="subtle" colorScheme={color}>{t(type)}</Tag>
  )
};

export default TicketType;
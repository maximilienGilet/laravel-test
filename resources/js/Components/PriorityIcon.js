import { Text } from "@chakra-ui/react";
import { AlertCircle, ChevronDown, ChevronUp } from "react-feather";
import { useTranslation } from "react-i18next";



const PriorityIcon = ({ priority, size }) => {
  const { t } = useTranslation();


  let icon = <ChevronUp size={size} />;
  let color = "green";

  switch (priority) {
    case "priority_low":
      icon = <ChevronDown size={size} />;
      color = "blue.700";
      break;
    case "priority_high":
      color = "red";
      icon = <AlertCircle size={size} />;
      break;
  }

  return (
    <Text title={t(priority)} color={color}>{icon}</Text>
  )
}


export default PriorityIcon;
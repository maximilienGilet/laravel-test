import { getPriorityColor } from "@/Helpers/colors";
import { Text } from "@chakra-ui/react";
import { AlertCircle, ChevronDown, ChevronUp } from "react-feather";
import { useTranslation } from "react-i18next";



const PriorityIcon = ({ priority, size }) => {
  const { t } = useTranslation();


  let icon = <ChevronUp size={size} />;

  switch (priority) {
    case "priority_low":
      icon = <ChevronDown size={size} />;
      break;
    case "priority_high":
      icon = <AlertCircle size={size} />;
      break;
  }

  const color = getPriorityColor(priority);

  return (
    <Text title={t(priority)} color={color}>{icon}</Text>
  )
}


export default PriorityIcon;
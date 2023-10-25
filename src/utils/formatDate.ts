import { format, compareAsc } from "date-fns";

const formatDate = (time?: string | number | Date) => {
  if (!time) {
    return;
  }

  return format(new Date(), "PP");
  //   return format(new Date(2017, 10, 6), "PP");
};
// format(new Date(), "MM/dd/yyyy");
//=> '02/11/2014'

export default formatDate;

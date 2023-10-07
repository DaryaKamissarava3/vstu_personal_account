import axios from "axios";

export const fetchWeekName = async () => {
  try {
    const response = await axios.get(process.env.SCHEDULE_NAME_OF_WEEK_API)
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const fetchWeekNumber = async () => {
  try {
    const response = await axios.get(process.env.SCHEDULE_NUMBER_OF_WEEK_API)
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const fetchStudentScheduleData = async (group) => {
  try {
    const response = await axios.get(process.env.SCHEDULE_NUMBER_OF_WEEK_API + `/patterns/search?q=groupName==${group}`)
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

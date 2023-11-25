const timeFormatter = (time) => {
    let timeString = "";
    let am_or_pm = "";
    const dateObj = new Date(time);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (hours < 12) am_or_pm = "AM";
    else am_or_pm = "PM";

    if (hours === 0) hours = 12;
    if (hours > 12) hours = hours - 12;

    timeString = `${hours.toString().padStart(2, 0)}:${minutes
        .toString()
        .padStart(2, 0)} ${am_or_pm}`;

    return timeString;
};

export { timeFormatter };

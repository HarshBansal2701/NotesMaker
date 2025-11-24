export const FormateDate = (date) => {

    const _date = new Date(date);

    if(isNaN(_date)){
        return "Invalid Date";
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(_date);

    return formattedDate;
}
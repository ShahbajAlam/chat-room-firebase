function nameFormatter(name) {
    let formattedName = name.trim().split(" ");
    formattedName = formattedName.map(
        (el) => el[0].toUpperCase() + el.slice(1).toLowerCase()
    );
    return formattedName.join(" ");
}

export { nameFormatter };

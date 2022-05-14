const getCordinates = () => {
    let rdo_ip;
    const myHeaders = new Headers({
        "Content-Type": "application/json",
    });
    let testURL = `http://localhost:3000/dbTest`;
    const myRequest = new Request("http://localhost:3000/dbTest", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    });
    fetch(myRequest, {
        body: JSON.stringify({
            ip: searchValue.value,
        }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then((data) => {
        console.log(data);
    });
};
export { getCordinates };

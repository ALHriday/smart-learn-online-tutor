
const AddTutorials = () => {
    const handleAddTutors = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const age = form.age.value;
        const data = { name, age };

        fetch('http://localhost:2100/tutors',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(result => {

                if (result.insertedId) {
                    form.name.value = '';
                    form.age.value = '';
                }
               
            })

    }
    return (
        <div className="w-1/2 mx-auto">
            <form onSubmit={handleAddTutors}>
                <input type="text" name="name" /> <br />
                <input type="number" name="age" /> <br />
                <button>Submit</button>
            </form>
        </div>
    );

};

export default AddTutorials;
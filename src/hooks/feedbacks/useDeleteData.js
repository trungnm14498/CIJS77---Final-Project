import axios from 'axios';

export function useDeleteItem(e, api, id, handlefunction) {
    e.preventDefault();
    let text = "Do you really want to delete this item?";
    if (confirm(text) == true) {
        axios.delete(`${api}/${id}`)
            .then(() => {
                alert("Successfully Deleted Item");

            })
            .then(() => handlefunction())
            .catch(err => {
                console.log('error', err);
            }
            )
    } else {
        alert("You canceled!");
    }
}
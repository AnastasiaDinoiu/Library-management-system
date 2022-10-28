import {Button, Container, Table} from "react-bootstrap";
import axiosClient from "../utils/axiosClient";
import {useEffect, useState} from "react";
import "./style.css"

function BooksTable() {
    const [books, setBooks] = useState([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        (async function getBooks() {
            try {
                const {data} = await axiosClient().get('/books')
                setBooks(data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    const handleDelete = async (id) => {
        try {
            const {status} = await axiosClient().delete(`/book/${id}`)
            if (status === 200) {
                setBooks(books.filter(book => book._id !== id))
                setMessage(`Book with ${id} id was successfully removed!`)
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError(`Book with ${id} id not found`)
                setTimeout(() => setError(''), 3000)
            }

        } catch (err) {
            setError(`Server error`)
            setTimeout(() => setError(''), 3000)
        }
    }

    const handleDeleteAll = async (id) => {
        if (books.length === 0) {
            setError("No books in database")
            return
        }
        try {
            const {status} = await axiosClient().delete('/books')
            if (status === 200) {
                setMessage(`Books successfully removed!`)
                setBooks([])
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError(`Database error`)
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            setError(`Database error`)
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <>
            {
                message ?
                    <div className="message">
                        <p>
                            {message}
                            <span className="closeNotification" onClick={() => setMessage('')}>x</span>
                        </p>
                    </div> : null
            }
            {
                error ?
                    <div className="error">
                        <p>
                            {error}
                            <span className="closeNotification closeNotification2" onClick={() => setError('')}>x</span>
                        </p>
                    </div> : null
            }
            <Container style={{paddingTop: '50px'}}>
                <Button className="deleteButton deleteAll" onClick={handleDeleteAll}>Delete All</Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publishing House</th>
                        <th>Pages Number</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map((book) => (
                            <tr key={book._id}>
                                <td>{book._id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishingHouse}</td>
                                <td>{book.pagesNumber}</td>
                                <td><Button className="deleteButton"
                                            onClick={() => handleDelete(book._id)}>Delete</Button>
                                </td>
                                <td><Button className="updateButton" href={`update-book/${book._id}`}>Update</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default BooksTable
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./style.css"
import {useState} from "react";
import {Container} from "react-bootstrap";
import axiosClient from "../utils/axiosClient";

function BookForm() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishingHouse, setPublishingHouse] = useState('')
    const [pagesNumber, setPagesNumber] = useState(0)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (pagesNumber < 10) {
            setError('Pages number must be greater than 10')
            setTimeout(() => setError(''), 3000)
            return
        }
        if (publishingHouse.length < 5) {
            setError('Publishing house length must have minimum 5 characters')
            setTimeout(() => setError(''), 3000)
            return
        }
        if (author.length < 5) {
            setError('Author length must have minimum 5 characters')
            setTimeout(() => setError(''), 3000)
            return
        }
        if (title.length < 5) {
            setError('Title length must have minimum 5 characters')
            setTimeout(() => setError(''), 3000)
            return
        }
        try {
            const response = await axiosClient().post('/books', {
                title,
                author,
                publishingHouse,
                pagesNumber
            })

            if (response.status === 200) {
                setMessage('Book successfully added!')
                setTitle('')
                setAuthor('')
                setPublishingHouse('')
                setPagesNumber(0)
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError('Database error')
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            setError('Database error')
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
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPublishingHouse">
                        <Form.Label>PublishingHouse</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter publishing house"
                            value={publishingHouse}
                            onChange={(e) => setPublishingHouse(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPagesNumber">
                        <Form.Label>PagesNumber</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter pages number"
                            value={pagesNumber}
                            onChange={(e) => setPagesNumber(Number(e.target.value))}
                        />
                    </Form.Group>

                    <Button className="updateButton" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default BookForm;
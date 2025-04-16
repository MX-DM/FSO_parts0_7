import { Form, Container, Table, Button } from 'react-bootstrap'
import { useState } from 'react'

const CommentSection = ({ blog, updateComments }) => {
    const [comment, setComment] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        updateComments(blog.id, comment)

        setComment('')
    }

    return(
        <Container className='m-0'>
            <Form className='d-flex' onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <div className='d-flex'>
                        <Form.Control
                            type="text"
                            value={ comment }
                            onChange={({ target }) => setComment(target.value)}
                            name="comment"
                            id="commentInput"
                        />
                        <Button variant="info" type="submit" className='ms-2'>
                            Send
                        </Button>
                    </div>
                </Form.Group>
            </Form>
            <Table>
                <tbody>
                    {blog.comments.map((c,i) => <tr key={i}><td>{c}</td></tr>)}
                </tbody>
            </Table>
        </Container>
    )
}

export default CommentSection
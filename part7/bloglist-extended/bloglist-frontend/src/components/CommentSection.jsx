import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const CommentSection = ({ blog, updateComments }) => {
    const [comment, setComment] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        updateComments(blog.id, comment)
        setComment('')
    }

    return (
        <div className="comment-section">
            <h4 className="comment-title">Comments</h4>

            <Form className="comment-form" onSubmit={onSubmit}>
                <Form.Group className="comment-form-group">
                    <Form.Label htmlFor="commentInput">Comment</Form.Label>
                    <div className="comment-input-row">
                        <Form.Control
                            type="text"
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                            name="comment"
                            id="commentInput"
                            className="comment-input"
                            placeholder='Enter a comment'
                        />
                        <Button variant="info" type="submit" className="comment-button">
                            Send
                        </Button>
                    </div>
                </Form.Group>
            </Form>

            <ul className="comment-list">
                {blog.comments.map((c, i) => (
                    <li key={i} className="comment-item">
                        {c}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommentSection
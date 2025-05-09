import { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './css/BlogForm.css'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Toggle form visibility

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({
            author: author,
            title: title,
            url: url
        });

        setAuthor('');
        setTitle('');
        setUrl('');
    };

    return (
        <Container className="my-5 formDiv">
            <h2 className='blog-form-h2'>Create New Blog</h2>
            {isOpen && (
                <Form onSubmit={addBlog}>
                    <Form.Group controlId="formTitle" className='mb-3'>
                        <Form.Label className='blog-form-label'>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            placeholder="Enter blog title"
                            className='blog-form-control'
                        />
                    </Form.Group>

                    <Form.Group controlId="formAuthor" className='mb-3'>
                        <Form.Label className='blog-form-label'>Author</Form.Label>
                        <Form.Control
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                            placeholder="Enter author's name"
                            className='blog-form-control'
                        />
                    </Form.Group>

                    <Form.Group controlId="formUrl" className='mb-3'>
                        <Form.Label className='blog-form-label'>URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                            placeholder="Enter blog URL"
                            className='blog-form-control'
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3 btn-save">
                        Save
                    </Button>
                </Form>
            )}
            <Button
                variant={isOpen ? 'danger' : 'success'}
                onClick={() => setIsOpen(!isOpen)}
                className="btn-toggle w-100 mt-3"
            >
                {isOpen ? 'Close' : 'Create!'}
            </Button>
        </Container>
    );
};

export default BlogForm;
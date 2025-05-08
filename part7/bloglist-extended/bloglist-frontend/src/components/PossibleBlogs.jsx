/*
import { Table, Button, Collapse } from 'react-bootstrap'
import React, { useState } from 'react'

const Blogs = ({ blogs }) => {
    const [openRow, setOpenRow] = useState(null)

    const toggleRow = (id) => {
        setOpenRow(openRow === id ? null : id)
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map((blog) => (
                    <React.Fragment key={blog.id}>
                        <tr>
                            <td>{blog.title}</td>
                            <td>{blog.author}</td>
                            <td>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => toggleRow(blog.id)}
                                >
                                    {openRow === blog.id ? 'Hide' : 'Details'}
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="3" className="p-0 border-0">
                                <Collapse in={openRow === blog.id}>
                                    <div className="p-3 bg-light border-top">
                                        <strong>URL:</strong> {blog.url}<br />
                                        <strong>Likes:</strong> {blog.likes}
                                    </div>
                                </Collapse>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </Table>
    )
}

export default Blogs
*/
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../index.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const Navigate = useNavigate()
    return (
        <div className="homepage-wrapper text-white">
            <Container fluid className="homepage-container d-flex align-items-center">
                <Row className="w-100">
                    <Col md={6} className="d-flex flex-column justify-content-center align-items-start p-5">
                        <h1 className="display-1 fw-bold">Blapp</h1>
                        <p className="fs-4">Create and check out blogs in one go!</p>
                        <Button variant="outline-light" size="lg" onClick={() => Navigate('/blogs')}>Start Creating!</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage
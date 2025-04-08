import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./components/pages/Home/Home";
import Footer from "./components/common/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTable from "./components/pages/EditTable/EditTable";
import AddTable from "./components/features/AddTable/AddTable";

function App() {
	return (
		<Container>
			<Navbar bg="primary" data-bs-theme="dark">
				<Container>
					<Navbar.Brand href="/" className="text-white">
						Waiter.app
					</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Link href="/" className="text-white">
							Home
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<BrowserRouter>
				<Routes>
					<Route path="/add" element={<AddTable />} />
					<Route path="/" element={<Home />} />
					<Route path="/edit/:id" element={<EditTable />} />
				</Routes>
			</BrowserRouter>
			<Footer></Footer>
		</Container>
	);
}

export default App;

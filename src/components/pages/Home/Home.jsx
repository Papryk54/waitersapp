import { Table, Button } from "react-bootstrap";
import TableGrid from "../../features/TableGrid/TableGrid";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Table></Table>
			<TableGrid></TableGrid>
			<Button
				variant="success"
				className="mb-3"
				onClick={() => navigate("/add")}
			>
				Add New Table
			</Button>
		</div>
	);
};

export default Home;

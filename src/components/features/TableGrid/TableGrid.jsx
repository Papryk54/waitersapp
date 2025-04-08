import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TableGrid.css";

const TableGrid = () => {
	const [tables, setTables] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:3131/tables")
			.then((response) => response.json())
			.then((data) => setTables(data));
	}, []);

	return (
		<Container>
			<h3>All tables</h3>
			{tables.length === 0 ? (
				<p>No tables available. Add a new one!</p>
			) : (
				tables.map((table) => (
					<Card key={table.id} className="border-0 border-bottom">
						<Card.Body className="row">
							<Card.Title className="col-2 custom-title">
								Table {table.tableNumber}
							</Card.Title>
							<Card.Text className="col-3">
								<strong>Status: </strong> {table.tableStatus}
								{table.tableStatus === "Busy" && (
									<>{" (" + table.tableBill + "$)"}</>
								)}
							</Card.Text>
							<Button
								className="col-2 ms-auto"
								onClick={() => navigate(`/edit/${table.id}`)}
							>
								Show More
							</Button>
						</Card.Body>
					</Card>
				))
			)}
		</Container>
	);
};

export default TableGrid;

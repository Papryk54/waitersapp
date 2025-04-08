import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";

const AddTable = () => {
	const [tableData, setTableData] = useState({
		id: "",
		tableNumber: "",
		tableStatus: "Free",
		maxTablePeopleAmount: 1,
		tablePeopleAmount: 0,
		tableBill: 0,
	});

	const navigate = useNavigate();
	if (tableData.maxTablePeopleAmount <= 0) {
		setTableData({ ...tableData, maxTablePeopleAmount: 1 });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = shortid.generate();

		const newTable = {
			id: id,
			tableNumber: tableData.tableNumber,
			tableStatus: tableData.tableStatus,
			maxTablePeopleAmount: parseInt(tableData.maxTablePeopleAmount),
			tablePeopleAmount: parseInt(tableData.tablePeopleAmount),
			tableBill: parseInt(tableData.tableBill),
		};

		fetch("http://localhost:3131/tables", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTable),
		})
			.then((response) => response.json())
			.then(() => {
				navigate("/");
			});
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit} className="mb-4">
				<h3>Add New Table</h3>

				<Form.Group>
					<Form.Label>Table Number</Form.Label>
					<Form.Control
						type="number"
						value={tableData.tableNumber}
						onChange={(e) =>
							setTableData({ ...tableData, tableNumber: e.target.value })
						}
						required
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Table Status</Form.Label>
					<Form.Select
						value={tableData.tableStatus}
						onChange={(e) =>
							setTableData({ ...tableData, tableStatus: e.target.value })
						}
					>
						<option value="Free">Free</option>
						<option value="Reserved">Reserved</option>
						<option value="Busy">Busy</option>
						<option value="Cleaning">Cleaning</option>
					</Form.Select>
				</Form.Group>

				<Form.Group>
					<Form.Label>Max People Amount</Form.Label>
					<Form.Select
						value={tableData.maxTablePeopleAmount}
						onChange={(e) =>
							setTableData({ ...tableData, maxTablePeopleAmount: e.target.value })
						}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
                        <option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
                        <option value="9">9</option>
						<option value="10">10</option>
					</Form.Select>
				</Form.Group>
				<Button variant="primary" type="submit" className="mt-2">
					Add Table
				</Button>
			</Form>
		</Container>
	);
};

export default AddTable;

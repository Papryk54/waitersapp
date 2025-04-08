import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTable = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [tableData, setTableData] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:3131/tables/${id}`)
			.then((response) => response.json())
			.then((data) => setTableData(data));
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		updateStatus(tableData.id, tableData.tableStatus);
		navigate("/");
	};

	const updateStatus = (id, newStatus) => {
		const updatedTable = { ...tableData, tableStatus: newStatus };

		fetch(`http://localhost:3131/tables/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTable),
		})
			.then((response) => response.json())
			.then((data) => setTableData(data));
	};

	const handleStatusChange = (e) => {
		const newStatus = e.target.value;
		setTableData((prevData) => {
			let updatedData = { ...prevData, tableStatus: newStatus };
			if (newStatus === "Free" || newStatus === "Cleaning") {
				updatedData.tablePeopleAmount = 0;
				updatedData.tableBill = 0;
			} else if (newStatus === "Reserved" || newStatus === "Busy") {
				if (updatedData.tablePeopleAmount === 0) {
					updatedData.tablePeopleAmount = 1;
				}
			}
			return updatedData;
		});
	};

	const handlePeopleAmountChange = (e) => {
		const newValue = parseInt(e.target.value);
		if (
			tableData.tableStatus === "Free" ||
			tableData.tableStatus === "Cleaning"
		) {
			setTableData({ ...tableData, tablePeopleAmount: 0 });
		} else if (
			tableData.tableStatus === "Reserved" ||
			tableData.tableStatus === "Busy"
		) {
			if (newValue >= 1 && newValue <= tableData.maxTablePeopleAmount) {
				setTableData({ ...tableData, tablePeopleAmount: newValue });
			} else {
				setTableData({ ...tableData, tablePeopleAmount: 1 });
			}
		}
	};

	const handleBillChange = (e) => {
		const newValue = parseInt(e.target.value);
		if (
			tableData.tableStatus === "Free" ||
			tableData.tableStatus === "Cleaning"
		) {
			if (newValue === 0 || newValue === null) {
				setTableData({ ...tableData, tableBill: 0 });
			} else {
				setTableData({ ...tableData, tableBill: newValue });
			}
		} else if (
			tableData.tableStatus === "Reserved" ||
			tableData.tableStatus === "Busy"
		) {
			setTableData({ ...tableData, tableBill: newValue });
		}
	};
	

	if (!tableData) return <p>Loading...</p>;

	return (
		<Container>
			<Form className="mb-4">
				<h3>Table {tableData.tableNumber}</h3>
				<Form.Group className="mb-3 d-flex align-items-center">
					<Form.Label className="fw-bold me-3">Status: </Form.Label>
					<Form.Select
						value={tableData.tableStatus}
						onChange={handleStatusChange}
						className="w-auto"
						style={{ maxWidth: "200px" }}
					>
						<option value="Free">Free</option>
						<option value="Reserved">Reserved</option>
						<option value="Busy">Busy</option>
						<option value="Cleaning">Cleaning</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3 d-flex align-items-center">
					<Form.Label className="fw-bold me-3">People: </Form.Label>
					<Form.Select
						value={tableData.tablePeopleAmount}
						style={{ maxWidth: "70px" }}
						onChange={handlePeopleAmountChange}
					>
						<option value="0">0</option>
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
					<span className="fs-4 mx-2">/</span>
					<Form.Select
						value={tableData.maxTablePeopleAmount}
						style={{ maxWidth: "70px" }}
						onChange={(e) =>
							setTableData({
								...tableData,
								maxTablePeopleAmount: e.target.value,
							})
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
				<Form.Group className="mb-3 d-flex align-items-center">
					<Form.Label className="fw-bold me-3">Bill:</Form.Label>
					<span className="fs-6 mx-2">$</span>
					<Form.Control
						value={tableData.tableBill}
						onChange={handleBillChange}
						className="text-center w-auto"
						style={{ maxWidth: "70px" }}
					/>
				</Form.Group>

				<Button variant="primary" type="submit" className="mt-2" onClick={handleSubmit}>
					Update Table
				</Button>
			</Form>
			<Button
				variant="success"
				className="mb-3"
				onClick={() => navigate("/add")}
			>
				Add New Table
			</Button>
		</Container>
	);
};

export default EditTable;

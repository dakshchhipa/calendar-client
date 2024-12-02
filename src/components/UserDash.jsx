import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Divider, Tooltip, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ReactTooltip from "react-tooltip";
import ComMod from "./ComMod";
import ComCal from "./ComCal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [communications, setCommunications] = useState([]);
  const [over, setOver] = useState([]);
  const [today, setToday] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState([]);
  const [selected, setSelected] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleCommunicationPerformed = () => {
    console.log(rowSelectionModel);
    const x = rowSelectionModel;
    let mySet = new Set();
    let arr = [];

    for (let i = 0; i < x.length; i++) {
      mySet.add(x[i].slice(24, x[i].length));
    }

    mySet.forEach((el) => arr.push({ name: el }));

    setSelectedCompanyId(arr);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogCommunication = (data) => {
    console.log("Communication Data:", data);
    data.company.forEach((el) => {
      setCommunications((prev) => [
        ...prev,
        {
          company: { name: el.name },
          date: data.date,
          type: { name: data.type },
          notes: data.notes,
        },
      ]);
    });
    console.log(communications);
  };

  const fetchCommsFromAPI = async () => {
    try {
      const response = await axios.get(
        `https://calendar-server-3.onrender.com/api/communications-user`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching communications:", error);
    }
  };

  const fetchNotificationsFromAPI = async () => {
    try {
      const response = await axios.get(
        `https://calendar-server-3.onrender.com/api/notifications`
      );
      return response.data; // Return notification data (overdue, today, etc.)
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const communicationsData = await fetchCommsFromAPI();
      setCommunications(communicationsData); // Set companies to state
      const ndata = await fetchNotificationsFromAPI();

      const over = ndata.filter((el) => el.type === "overdue");
      const today = ndata.filter((el) => el.type === "due today");
      setOver(over);
      setToday(today);
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography sx={{ fontWeight: 600, color: "#333" }}>
            {params.row.company.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: "lastCommunications",
      headerName: "Last 5 Communications",
      width: 300,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip key={params.row._id} title={params.row.notes}>
              <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                {`${params.row.type.name} - ${new Date(
                  params.row.date
                ).toLocaleDateString()}`}
              </Typography>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "nextCommunication",
      headerName: "Next Scheduled Communication",
      width: 300,
      renderCell: (params, idx) => {
        const date = new Date(params.row.date);
        date.setDate(date.getDate() + 5);
        const updatedDateString = date.toLocaleDateString();

        return (
          <Typography sx={{ fontWeight: 500, color: "#333" }}>
            {`${params.row.type.name} - ${updatedDateString}`}
          </Typography>
        );
      },
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="dashboard-container mt-4">
      <div className="flex w-fit ml-auto mr-4">
        <Button
          className="logout-btn"
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <Box p={3} className="dashboard-box">
        {/* Communication Calendar on Top */}
        <ComCal communications={communications} />

        <div className="text-4xl font-extrabold capitalize underline mx-auto w-fit text-primary" style={{ color: "#333" }}>
          USER DASHBOARD
        </div>

        {/* Notification Section */}
        <Box mb={2}>
          <div className="notification-title">Notifications</div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="flex items-center">
                Overdue Communications
                <div className="notification-count">{over.length}</div>
              </div>
              <Box className="notification-card">
                {over.length > 0 ? (
                  over.map((x, idx) => (
                    <Typography key={idx}>{`${idx + 1}. ${x.company.name} - ${x.message}`}</Typography>
                  ))
                ) : (
                  <Typography>No overdue communications</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="flex items-center">
                Today's Communications
                <div className="notification-count">{today.length}</div>
              </div>
              <Box className="notification-card-today">
                {today.length > 0 ? (
                  today.map((x, idx) => (
                    <Typography key={idx}>{`${idx + 1}. ${x.company.name} - ${x.message}`}</Typography>
                  ))
                ) : (
                  <Typography>No communications due today</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Data Grid */}
        <div className="data-grid-container">
          <DataGrid
            rows={communications}
            getRowId={(row) => row._id + row.company.name}
            columns={columns}
            pageSizeOptions={[5]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
              setSelected(newRowSelectionModel.length > 0);
            }}
            rowSelectionModel={rowSelectionModel}
            sx={{
              boxShadow: 2,
              borderRadius: "8px",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f0f0f0",
                color: "#333",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f1f1",
                transform: "scale(1.01)",
              },
            }}
          />
        </div>

        {/* Button to perform communication */}
        <div className="mt-3">
          <Button
            className="data-grid-button"
            variant="contained"
            onClick={handleCommunicationPerformed}
            disabled={!selected}
          >
            Communication Performed
          </Button>

          <ComMod
            open={openModal}
            onClose={handleCloseModal}
            onSubmit={handleLogCommunication}
            company={selectedCompanyId}
          />
        </div>
      </Box>
    </div>
  );
};

export default UserDashboard;

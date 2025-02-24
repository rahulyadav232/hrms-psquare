// import React, { useState, useEffect } from "react";
// import { Notifications, Message } from "@mui/icons-material";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import "./Dashboard.css";
// import Sidebar from "../Sidebar/Sidebar";

// const Dashboard = () => {
//   const [statusFilter, setStatusFilter] = useState(""); // Status filter
//   const [positionFilter, setPositionFilter] = useState(""); // Position filter
//   const [searchQuery, setSearchQuery] = useState(""); // Search query
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/candidates")
//       .then((res) => res.json())
//       .then((data) => setCandidates(data))
//       .catch((err) => console.error("Error fetching candidates:", err));
//   }, []);

//   // **Filter candidates based on position, status, and name search**
//   const filteredCandidates = candidates.filter((candidate) => {
//     const matchesPosition =
//       positionFilter === "" || candidate.position.toLowerCase() === positionFilter.toLowerCase();
//     const matchesStatus =
//       statusFilter === "" || candidate.status.toLowerCase() === statusFilter.toLowerCase();
//     const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesPosition && matchesStatus && matchesSearch;
//   });

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <AppBar position="static" color="transparent" elevation={0} className="navbar">
//           <Toolbar className="navbar-toolbar">
//             <div className="candidate-title">Candidates</div>
//             <div className="right-icons">
//               <IconButton>
//                 <Message className="icon" />
//               </IconButton>
//               <IconButton>
//                 <Notifications className="icon" />
//               </IconButton>
//               <img src={`${process.env.PUBLIC_URL}/image.png`} alt="Profile" className="profile-pic" />
//             </div>
//           </Toolbar>
//           <Toolbar className="navbar-toolbar">
//             <div className="filters">
//               {/* Status Filter */}
//               <FormControl variant="outlined" size="small" className="dropdown">
//                 <InputLabel>Status</InputLabel>
//                 <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
//                   <MenuItem value="">All</MenuItem>
//                   <MenuItem value="new">New</MenuItem>
//                   <MenuItem value="selected">Selected</MenuItem>
//                   <MenuItem value="rejected">Rejected</MenuItem>
//                 </Select>
//               </FormControl>

//               {/* Position Filter */}
//               <FormControl variant="outlined" size="small" className="dropdown">
//                 <InputLabel>Position</InputLabel>
//                 <Select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)} label="Position">
//                   <MenuItem value="">All</MenuItem>
//                   <MenuItem value="developer">Developer</MenuItem>
//                   <MenuItem value="hr">HR</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>

//             {/* Search Bar */}
//             <div className="right-icons">
//               <TextField
//                 fullWidth
//                 placeholder="Search by Name"
//                 variant="outlined"
//                 size="small"
//                 className="search-candidate"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: "#4B0082", "&:hover": { backgroundColor: "#3A0066" } }}
//               >
//                 Add Candidate
//               </Button>
//             </div>
//           </Toolbar>
//         </AppBar>

//         {/* Candidates Table */}
//         <TableContainer component={Paper} className="table-container">
//           <Table>
//             <TableHead className="table-header">
//               <TableRow>
//                 <TableCell>Sr no.</TableCell>
//                 <TableCell>Candidates Name</TableCell>
//                 <TableCell>Email Address</TableCell>
//                 <TableCell>Phone Number</TableCell>
//                 <TableCell>Position</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredCandidates.map((candidate, index) => (
//                 <TableRow key={candidate._id} hover>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{candidate.name}</TableCell>
//                   <TableCell>{candidate.email}</TableCell>
//                   <TableCell>{candidate.phone}</TableCell>
//                   <TableCell>{candidate.position}</TableCell>
//                   <TableCell>{candidate.status}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  Notifications,
  MoreVert,
  Message,
  UploadFile,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    agree: false,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);

  const handleAddCandidateClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewCandidate((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleCheckboxChange = (e) => {
    setNewCandidate((prev) => ({ ...prev, agree: e.target.checked }));
  };

  const handleSubmit = async () => {
    const candidateData = {
      name: newCandidate.name,
      email: newCandidate.email,
      phone: newCandidate.phone,
      position: newCandidate.position,
      experience: newCandidate.experience,
    };

    try {
      const response = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });

      const data = await response.json();

      if (response.ok) {
        setCandidates((prev) => [...prev, data]);
        setNewCandidate({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          resume: null,
          agree: false,
        });
        handleClose();
      } else {
        console.error("Failed to add candidate:", data.error);
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesPosition =
      positionFilter === "" ||
      candidate.position.toLowerCase() === positionFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "" ||
      candidate.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesPosition && matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          className="navbar"
        >
          <Toolbar className="navbar-toolbar">
            <div className="candidate-title">Candidates</div>
            <div className="right-icons">
              <IconButton>
                <Message className="icon" />
              </IconButton>
              <IconButton>
                <Notifications className="icon" />
              </IconButton>
              <img
                src={`${process.env.PUBLIC_URL}/image.png`}
                alt="Profile"
                className="profile-pic"
              />
            </div>
          </Toolbar>
          <Toolbar className="navbar-toolbar">
            <div className="filters">
              <FormControl variant="outlined" size="small" className="dropdown">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="selected">Selected</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" className="dropdown">
                <InputLabel>Position</InputLabel>
                <Select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  label="Position"
                >
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="right-icons">
              <TextField
                fullWidth
                placeholder="Search"
                variant="outlined"
                size="small"
                className="search-candidate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4B0082",
                  "&:hover": { backgroundColor: "#3A0066" },
                }}
                onClick={handleAddCandidateClick}
              >
                Add Candidate
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogContent>
            <TextField
              label="Full Name"
              fullWidth
              margin="dense"
              name="name"
              value={newCandidate.name}
              onChange={handleChange}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="dense"
              name="email"
              value={newCandidate.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="dense"
              name="phone"
              value={newCandidate.phone}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Position</InputLabel>
              <Select
                name="position"
                value={newCandidate.position}
                onChange={handleChange}
              >
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Experience"
              fullWidth
              margin="dense"
              name="experience"
              value={newCandidate.experience}
              onChange={handleChange}
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCandidate.agree}
                  onChange={handleCheckboxChange}
                />
              }
              label="Agree to terms"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={!newCandidate.agree}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Sr no.</TableCell>
                <TableCell>Candidates Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.map((candidate, index) => (
                <TableRow key={candidate._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.phone}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;

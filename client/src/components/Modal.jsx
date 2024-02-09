import React from "react";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";

import { FaTrashAlt } from "react-icons/fa";

const ModalBox = ({ item, open, setOpen, deleteProject }) => {
 
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          minWidth: 300,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg">
          Project Details.
        </Typography>
        <Divider orientation="horizontal" mb={1} />
        <div className="mt-3"></div>
        <span className="modal_projects">Name:</span>
        <Typography id="modal-owner" textColor="text.tertiary" mb={1}>
          {item?.name}
        </Typography>
        <span className="modal_projects">Project Type:</span>
        <Typography id="modal-link" textColor="text.tertiary" mb={1}>
          {item?.project_type ? `${item.project_type}` : "Any stack will do"}
        </Typography>
        <span className="modal_projects">Project Description:</span>
        <Typography id="modal-desc" textColor="text.tertiary" mb={1}>
          {item?.description
            ? `${item.description}`
            : "No Project Description provided"}
        </Typography>
        <span className="modal_projects">Project Owner:</span>
        <Typography id="modal-owner" textColor="text.tertiary" mb={1}>
          {item?.user
            ? `${item.user.username}`
            : "Project owner does not exist"}
        </Typography>
        <span className="modal_projects">Project Members:</span>
        <Typography id="modal-members" textColor="text.tertiary" mb={1}>
          {item?.members
            ? `  ${item.members}\n`
            : "No members assigned to this project yet"}
        </Typography>
        <span className="modal_projects">Github Link:</span>
        <Typography id="modal-link" textColor="text.tertiary" mb={1}>
          {item?.github_link
            ? ` ${item.github_link}`
            : "No link has been provided for this project"}
        </Typography>
        {localStorage.getItem("role") === "admin" && (
          <button
            className="bg-red-500 rounded-lg text-white font-semibold mt-3 py-2 px-4 w-full "
            onClick={() => deleteProject(item.id)}>
            {/* Delete Project */}
            <FaTrashAlt size={"1.3em"} className="mx-auto" />
          </button>
        )}
      </Sheet>
    </Modal>
  );
};

export default ModalBox;

import folder from "../assets/folder.png";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
// import AppContext from "../context/Appcontext";

export default function Project({
  id,
  name,
  desc,
  members,
  git,
  stack,
  classId,
  deleted,
  isAdmin,
  user,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className=" p-2 m-2 rounded-md border-2 w-fit transition-all delay-300 ease-in-out hover:scale-105">
      <div className="">
        <img src={folder} alt="icon" className=" w-[7rem] md:w-[12rem]" />
      </div>
      <div className="py-2">
        <p>{name.length > 15 ? `${name.slice(0, 15)}...` : name}</p>
        <div className="flex justify-between mt-2">
          <button
            className={`
            bg-blue-500 text-white rounded-full px-3 cursor-pointer`}
            onClick={() => setOpen(true)}
          >
            view
          </button>
          {localStorage.getItem("role") === "admin" ? (
            <button
              className="bg-red-400 text-white rounded-full px-3 cursor:pointer"
              onClick={() => deleted(id)}
            >
              Delete
            </button>
          ) : null}
        </div>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h6"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {/* This is the modal title */}
              Project Name: {name}
            </Typography>
            <Typography id="modal-owner" textColor="text.tertiary" mb={1}>
              {/* {owner && `Project Owner:  ${owner}`} */}
            </Typography>
            <Typography id="modal-link" textColor="text.tertiary" mb={1}>
              {stack ? `Project Type: ${stack}` : "Any stack will do"}
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary" mb={1}>
              {desc
                ? `Project Description:  ${desc}`
                : "No Project Description available"}
            </Typography>
            <Typography id="modal-owner" textColor="text.tertiary" mb={1}>
              {user
                ? `Project Owner:  ${user}\n`
                : "Project owner does not exist"}
            </Typography>
            <Typography id="modal-members" textColor="text.tertiary" mb={1}>
              {members
                ? `Project Members:  ${members}\n`
                : "No members assigned to this project yet"}
            </Typography>

            <Typography id="modal-link" textColor="text.tertiary" mb={1}>
              {git
                ? `Github Link: ${git}`
                : "No link has been provided for this project"}
            </Typography>
          </Sheet>
        </Modal>
      </div>
    </div>
  );
}

import { Router } from "express";
import {
  addDocument,
  changeVisibility,
  deleteDocument,
  getDocument,
  getDocumentByUUID,
} from "../controllers/documents";
import { auth } from "../middlewares";

const documentRouter = Router();

documentRouter
  .post("/document/upload", auth, addDocument)
  .patch("/document/visibility", auth, changeVisibility)
  .get("/document-by-uuid/:uuid", getDocumentByUUID)
  .get("/document/", auth, getDocument)
  .delete("/document/:id", auth, deleteDocument)

export default documentRouter;

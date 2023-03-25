import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../store/store";
import { addPost, setIsOpenPostModal } from "../../features/post/postSlice";
import { formInterface } from "../../interfaces/Post";
import { validate } from "../../helper/validation";

export default function PostForm() {
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const [validMsg, setValidMsg] = useState<string>("");
  const dispatch = useAppDispatch();
  const { isOpenPostModal } = useAppSelector((state) => state.posts);

  const [formData, setFormData] = useState<formInterface>({
    title: "",
    subTitle: "",
    status: "",
  });
  const { title, subTitle, status } = formData;

  const resetForm = (): void => {
    setFormData({
      ...formData,
      title: "",
      subTitle: "",
      status: "",
    });
  };

  const handleClose = () => {
    dispatch(setIsOpenPostModal(false));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const data: formInterface = {
      title: formData.title,
      subTitle: formData.subTitle,
      status: formData.status,
    };

    const errValidMsg = validate({ title, subTitle, status });
    if (errValidMsg) {
      setValidMsg(errValidMsg);
      setIsShowAlert(true);
      setTimeout(() => {
        setIsShowAlert(false);
      }, 2000);
      return;
    } else {
      dispatch(addPost(data));
      dispatch(setIsOpenPostModal(false));
      setValidMsg("");
      resetForm();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Modal
          show={isOpenPostModal}
          onHide={handleClose}
          backdrop="static"
          centered
        >
          <Alert show={isShowAlert} variant="danger">
            <h5>{validMsg}</h5>
          </Alert>
          <Modal.Header closeButton>
            <Modal.Title>Posting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title: * </Form.Label>
              <Form.Control
                required
                value={title}
                name="title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInpust1">
              <Form.Label>Subtitle: * </Form.Label>
              <Form.Control
                value={subTitle}
                name="subTitle"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                type="text"
                placeholder=""
                required
              />
            </Form.Group>

            <Form.Select
              as="select"
              value={status}
              name="status"
              onChange={(e: any) => onChange(e)}
              className="mb-3"
            >
              <option value="">Choose status: *</option>
              <option value="In process">In process</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

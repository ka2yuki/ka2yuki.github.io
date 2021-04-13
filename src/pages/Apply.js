import ApplyForm from "../components/ApplyForm";
import Typography from "@material-ui/core/Typography";
import Alert from "../components/_Alert";

const Apply = () => {
  return (
    <>
      <Alert />
      <Typography className="pt-4 text-center" component="h1" variant="h4">
        【お問い合わせ】
      </Typography>
      <ApplyForm />
    </>
  );
};
export default Apply;

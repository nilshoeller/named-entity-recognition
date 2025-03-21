import Card from "../components/cards/Card";
import "../index.css";

function StartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mt-4 text-center">
        <h1 className="mb-6 p-10 pb-20">
          Willkommen auf unserer Text-Analyse Webseite!
        </h1>
        <div className="flex flex-wrap justify-center gap-7">
          <Card
            title="Text Analyse"
            description="Analysiere deinen Text mit unserem Tool"
            imageSrc={"/assets/analysis.jpg"}
            buttonText={"Analyse Tool"}
            buttonLink={"/text-analyse"}
          />
          <Card
            title="Login"
            description="Hier können Sie sich einloggen, um Ihre Daten einzusehen und zu bearbeiten."
            imageSrc={"/assets/login.jpg"}
            buttonText={"Login"}
            buttonLink={"/login"}
          />
          <Card
            title="Signup"
            description="Hier können Sie einen Account anlegen, um unsere Features zu nutzen und Ihre Daten zu speichern."
            imageSrc={"/assets/signup.jpg"}
            buttonText={"Signup"}
            buttonLink={"/new-account"}
          />
        </div>
      </div>
    </div>
  );
}

export default StartPage;

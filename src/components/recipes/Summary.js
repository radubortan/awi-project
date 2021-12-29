import Card from "../ui/Card";
import RadioButton from "../general/RadioButton";
import Checkbox from "../general/Checkbox";
import NumberInput from "../general/NumberInput";
const Summary = (props) => {
  return (
    <Card>
      <h1>Synthèse</h1>
      <Card>
        <h1>Coûts</h1>
        <div className="row">
          <div className="col">
            <Card>
              <h2>Assaisonnement</h2>
              <RadioButton name="prixAssaisonnement" label="5%"></RadioButton>
              <RadioButton name="prixAssaisonnement">
                <NumberInput labelUnite="€"></NumberInput>
              </RadioButton>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Checkbox label="Charges"></Checkbox>
              <NumberInput
                label="Cout horaire moyen"
                labelUnite="€"
              ></NumberInput>
              <NumberInput
                label="Cout horaire forfetaire"
                labelUnite="€"
              ></NumberInput>
            </Card>
          </div>
        </div>
        <Card>
          <div className="row">
            <div className="col">
              <ul>
                <li>Coût brut ingrédients</li>
                <li>Coût de production</li>
                <li>Prix de vente total</li>
                <li>Prix de vente par portion</li>
                <li>Seuil de rentabilité</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>2</li>
                <li>3</li>
                <li>15</li>
                <li>5</li>
                <li>10</li>
              </ul>
            </div>
          </div>
        </Card>
      </Card>
      <Card>
        <h1>Tous les ingrédients</h1>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h2>Allèrgenes</h2>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default Summary;

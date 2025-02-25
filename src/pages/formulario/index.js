import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import xmlData from "../../signos.xml";
import '../../styles.css'
const parseXML = async () => {
    const response = await fetch(xmlData);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const signos = Array.from(xml.getElementsByTagName("signo")).map(signo => ({
      nome: signo.getElementsByTagName("nome")[0].textContent,
      inicio: signo.getElementsByTagName("inicio")[0].textContent,
      fim: signo.getElementsByTagName("fim")[0].textContent
    }));
    return signos;
  };
  
export function Formulario() {
    const [dataNascimento, setDataNascimento] = useState("");
    const navigate = useNavigate();
    const [signos, setSignos] = useState([]);
  
    useEffect(() => {
      parseXML().then(setSignos);
    }, []);
  
    const calcularSigno = () => {
      const [ano, mes, dia] = dataNascimento.split("-");
      const dataFormatada = `${mes}-${dia}`;
      const signo = signos.find(
        (s) => dataFormatada >= s.inicio && dataFormatada <= s.fim
      ) || signos.find((s) => s.nome === "Capricórnio");
  
      navigate(`/resultado/${signo.nome}`);
    };
  
    return (
      <div className="container">
        <h2>Consulta de Signo</h2>
        <input
          className="input-date"
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        <button className="btn" onClick={calcularSigno}>Consultar</button>
      </div>
    );
  }
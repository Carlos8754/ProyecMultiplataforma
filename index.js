const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImZlYTcxMGZmLWU0MjYtNDgxOS04Zjk2LTYzYzlmZDJhMWU0MiIsImlhdCI6MTc2Mzg0NzIzNywic3ViIjoiZGV2ZWxvcGVyLzMwMjA5ZjM0LTU5MDItZWYzYy02M2JiLTNjM2M0ZWU1MTk3NCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTAuMTI0LjIyLjIxOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.htzIr5K7ER_E9fRv1YX8MmrIeWNF3UzoXQOFRceMJklu-95kOiP28xZeaKFE_FiAPzhmK1lmKIRMcT6w-kKBRQ"; 

async function buscarJugador() {
  let tagInput = document.getElementById("playerTag").value.trim();

  if (!tagInput) {
    document.getElementById("resultado").innerHTML =
      "<p style='color: #ff6666;'>Por favor, ingresa un tag de jugador.</p>";
    return;
  }

 
  if (!tagInput.startsWith("#")) {
    tagInput = "#" + tagInput;
  }

  const tag = encodeURIComponent(tagInput.replace("#", ""));
  const url = `https://api.clashroyale.com/v1/players/%23${tag}`;


  const proxy = "https://api.allorigins.win/raw?url=";
  const urlConProxy = proxy + encodeURIComponent(url);

  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    }
  };

  document.getElementById("resultado").innerHTML = "<p>Cargando...</p>";

  try {
    const respuesta = await fetch(urlConProxy, options);

    if (!respuesta.ok) {
      document.getElementById("resultado").innerHTML =
        `<p style='color: #ff6666;'>No se encontró el jugador o hay problema con la API. Código: ${respuesta.status}</p>`;
      return;
    }

    const data = await respuesta.json();
    mostrarJugador(data);

  } catch (error) {
    console.error("Error en fetch:", error);
    document.getElementById("resultado").innerHTML =
      "<p style='color: #ff6666;'>Error al conectar con la API. Revisa tu API Key o la conexión.</p>";
  }
}

function mostrarJugador(data) {
  const html = `
    <h2>${data.name}</h2>
    <p><strong>Copas:</strong> ${data.trophies}</p>
    <p><strong>Nivel del Rey:</strong> ${data.expLevel}</p>
    <p><strong>Clan:</strong> ${data.clan ? data.clan.name : "Sin clan"}</p>
  `;

  document.getElementById("resultado").innerHTML = html;
}


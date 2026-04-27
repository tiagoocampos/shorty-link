import { Label } from "./components/ui/label"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { BadgeQuestionMark } from "lucide-react"
import { Help } from "./components/Help"



function App() {
  const [url, setUrl] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  console.log(url)
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function createShort() {

    if (!url) {
      toast('Digite uma URL', { position: 'top-right' })
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json();

      toast(data.message, { position: 'top-right' })
      console.log(data.message)
      console.log(data)
      setShortUrl(data.shortUrl);

    } catch (error) {
      console.log(error);
      toast('Erro ao criar o link', { position: 'top-right' })
    }

    setLoading(false);
  }

  function handleCopy() {
    if (url === '') {
      toast('Nada para copiar', { position: 'top-right' })
      return;
    }
    navigator.clipboard.writeText(shortUrl);

    toast('Link copiado para a área de transferência', { position: 'top-right' })
  }

  return (
    <div className="flex justify-center items-center bg-gray-950 h-screen">
      <div className="flex justify-center flex-col p-10 gap-5 items-center w-100 border shadow-2xl border-gray-200 rounded-lg bg-gray-500">
        <h1 className="text-2xl font-bold text-shadow-lg text-white">Encurtador de Links</h1>
        <div className="flex relative justify-center text-white items-center gap-2 flex-col">
          <Label className="text-shadow-lg">Sua URL:</Label>

          <div>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} className="bg-gray-400" />
            <Button onClick={() => setShowHelp(prev => !prev)} className="absolute ml-2 " variant="secondary"><BadgeQuestionMark /></Button>

          </div>
          <Button onClick={() => createShort()} variant="secondary" className="cursor-pointer text-shadow-lg">Encurtar</Button>
          {loading ? "Encurtando..." : ""}
        </div>
        <div className="flex justify-center text-white items-center gap-2 flex-col">
          <Label className="text-shadow-lg">URL Gerada</Label>
          <Input value={shortUrl} className="bg-gray-400" />
          <Button onClick={() => handleCopy()} variant="secondary" className="cursor-pointer bg-green-500 text-shadow-lg text-white">Copiar</Button>
        </div>

      </div>
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </div>
  )
}

export default App

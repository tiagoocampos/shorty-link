import { Button } from "./ui/button";

export function Help({ onClose }) {
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[5px] flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col p-10 gap-5 items-center w-120 border shadow-2xl border-gray-200 rounded-lg bg-gray-500 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="font-bold">Ajuda:</h1>
                <p>O formato da URL deve conter <u>"http://"</u> ou <u>"https://"</u>.</p>
                <p>Caso contrário, retornará um erro!</p>
                <Button onClick={onClose} variant="secondary">Fechar</Button>
            </div>
        </div>
    )
}
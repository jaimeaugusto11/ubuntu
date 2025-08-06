import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full text-center bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Bem-vindo ao site empresarial
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Este é o futuro site empresarial oficial da nossa empresa. No momento, estamos trabalhando intensamente no desenvolvimento de uma plataforma moderna, funcional e alinhada às necessidades dos nossos clientes e parceiros. 
          <br /><br />
          Em breve, este espaço será transformado num ambiente digital completo, com informações institucionais, serviços, soluções empresariais, área de cliente, suporte técnico e muito mais.
          <br /><br />
          Agradecemos pela sua paciência e interesse. Enquanto isso, se você já possui acesso à plataforma interna, pode efetuar login através do botão abaixo.
        </p>
        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  );
}


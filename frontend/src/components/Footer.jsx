export default function Footer(){
  return (
    <footer className="mt-12 border-t py-6">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} HelloWorld</div>
        <div className="flex items-center gap-3">
          <div className="text-xs">Paleta:</div>
          <div className="w-5 h-5 rounded border" style={{ backgroundColor: '#ffffff' }} />
          <div className="w-5 h-5 rounded" style={{ backgroundColor: '#ff6600' }} />
          <div className="w-5 h-5 rounded" style={{ backgroundColor: '#000000' }} />
        </div>
      </div>
    </footer>
  )
}

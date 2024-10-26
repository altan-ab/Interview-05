import React, { useEffect, useState, useRef } from 'react'

function App() {
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])
  const [modalText, setModalText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Input değişiminde metni güncelle
  function handleChange(e) {
    setText(e.target.value)
  }

  // Listeye metin ekleme
  function handleAddText() {
    if (text.trim()) {
      setTextList((prevList) => [...prevList, text])
      setText('')
    }
  }

  // Metni kısaltma
  function shortenText(itemText) {
    return itemText.length >= 6 ? itemText.slice(0, 5) + '...' : itemText
  }

  // Modal açma
  function openModal(fullText) {
    setModalText(fullText)
    setIsModalOpen(true)
  }

  // Modal kapatma
  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col items-center p-6">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border rounded p-1 mb-4 mt-6"
        placeholder="Bir metin girin"
      />
      <button
        onClick={handleAddText}
        className="bg-lime-600 text-white px-6 py-1 rounded mb-4"
      >
        Ekle
      </button>

      <div className="space-y-2">
        {textList.map((item) => (
          <div
            key={crypto.randomUUID()}
            onClick={() => openModal(item)}
            className="cursor-pointer"
          >
            {shortenText(item)}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            className="bg-black p-16 rounded text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white">Full text: "{modalText}"</p>
            <button
              onClick={closeModal}
              className="mt-8 bg-red-700 text-white px-2 py-1 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

/*
Yayılmayı durdurma: (document-10-olaylara yanıt verme)
Bu olay nesnesi aynı zamanda yayılmayı durdurmanıza da olanak tanır. Bir olayın üst bileşenlere ulaşmasını engellemek istiyorsanız, bu Button bileşeninin yaptığı gibi e.stopPropagation() işlevini çağırmanız gerekir.
Bu projede de div içinde geçerli, bu sayede modal içinde tıklandığında olay üst bileşene taşınmaz ve modal kapanmaz.
*/

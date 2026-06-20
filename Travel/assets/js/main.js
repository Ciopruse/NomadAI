// ================================================
// MAIN.JS - 12 Popular Destinations
// ================================================

const destinations = [
  {
    name: "Bali, Indonesia",
    price: "₹45,000",
    days: "7 Days",
    img: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800"
  },
  {
    name: "Goa, India",
    price: "₹28,000",
    days: "5 Days",
    img: "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hfGVufDB8fDB8fHww"
  },
  {
    name: "Paris, France",
    price: "₹85,000",
    days: "6 Days",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800"
  },
  {
    name: "Dubai, UAE",
    price: "₹65,000",
    days: "5 Days",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800"
  },
  {
    name: "Darjeeling, India",
    price: "₹35,000",
    days: "6 Days",
    img: "https://images.unsplash.com/photo-1545324367-8997ba3b801e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmplZWxpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Thailand (Bangkok)",
    price: "₹52,000",
    days: "7 Days",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoYWlsYW5kfGVufDB8fDB8fHww"
  },
  {
    name: "Kerala Backwaters",
    price: "₹42,000",
    days: "6 Days",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww"
  },
  {
    name: "New York, USA",
    price: "₹1,20,000",
    days: "8 Days",
    img: "https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Maldives",
    price: "₹95,000",
    days: "5 Days",
    img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Ladakh, India",
    price: "₹55,000",
    days: "7 Days",
    img: "https://images.unsplash.com/photo-1619837374214-f5b9eb80876d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFkYWtofGVufDB8fDB8fHww"
  },
  {
    name: "Singapore",
    price: "₹68,000",
    days: "6 Days",
    img: "https://plus.unsplash.com/premium_photo-1697729432930-3f11644e9184?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2luZ2Fwb3JlfGVufDB8fDB8fHww"
  },
  {
    name: "Rome, Italy",
    price: "₹92,000",
    days: "7 Days",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800"
  }
];

const container = document.getElementById('destinations');

destinations.forEach(dest => {
  const card = document.createElement('div');
  card.className = "bg-slate-900 rounded-3xl overflow-hidden card-hover transition-all cursor-pointer group";

  card.innerHTML = `
    <div class="relative">
      <img src="${dest.img}" 
           alt="${dest.name}"
           onerror="this.src='https://via.placeholder.com/600x400/1e2937/67e8f9?text=${dest.name}'"
           class="w-full h-64 object-cover transition-transform group-hover:scale-105 duration-300">
      <div class="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        ${dest.days}
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-2xl font-semibold mb-1">${dest.name}</h3>
      <p class="text-cyan-400 text-2xl font-bold">${dest.price}</p>
      
      <button onclick="startAIPlanning('${dest.name}')" 
              class="mt-6 w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-2xl transition-all">
        Let AI Plan This Trip →
      </button>
    </div>
  `;
  container.appendChild(card);
});

// Go to chat with pre-filled prompt
function startAIPlanning(destination) {
  localStorage.setItem('aiPrompt', `Plan a complete trip to ${destination}`);
  window.location.href = 'chat.html';
}
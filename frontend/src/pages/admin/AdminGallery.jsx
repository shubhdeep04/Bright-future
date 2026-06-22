







// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   FiUpload, FiTrash2, FiEdit2, FiStar, FiX, FiCheck,
//   FiSearch, FiLink, FiImage, FiVideo, FiRefreshCw,
//   FiSave, FiCheckSquare, FiSquare, FiMove, FiPlus,
//   FiAlertCircle, FiEye
// } from "react-icons/fi";
// import api from "../../utils/api";
// import toast from "react-hot-toast";

// const CATEGORIES = ["Education", "Healthcare", "Events", "Women Empowerment", "Environment"];

// const EMPTY_FORM = {
//   title: "", description: "", category: "", mediaType: "image", url: "",
// };

// /* ── helpers ── */
// function MediaThumb({ item, className = "" }) {
//   if (item.mediaType === "video") {
//     return (
//       <div className={`relative bg-black/40 flex items-center justify-center ${className}`}>
//         <video src={item.url} className="w-full h-full object-cover opacity-70" muted preload="metadata" />
//         <FiVideo className="absolute text-white/80" size={20} />
//       </div>
//     );
//   }
//   return (
//     <img src={item.url} alt={item.title}
//       className={`w-full h-full object-cover ${className}`}
//       onError={e => { e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=60"; }} />
//   );
// }

// /* ══════════════════════════════════════════════ */
// export default function AdminGallery() {
//   const [items, setItems]           = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [search, setSearch]         = useState("");
//   const [filterCat, setFilterCat]   = useState("All");
//   const [filterType, setFilterType] = useState("all");

//   /* Selection */
//   const [selected, setSelected]     = useState(new Set());
//   const [selectMode, setSelectMode] = useState(false);

//   /* Upload panel */
//   const [showUpload, setShowUpload] = useState(false);
//   const [uploadTab, setUploadTab]   = useState("file"); // file | url
//   const [uploadForm, setUploadForm] = useState(EMPTY_FORM);
//   const [uploading, setUploading]   = useState(false);
//   const [uploadFiles, setUploadFiles] = useState([]);
//   const [dragOver, setDragOver]     = useState(false);
//   const fileInputRef = useRef(null);

//   /* Edit modal */
//   const [editItem, setEditItem]     = useState(null);
//   const [editForm, setEditForm]     = useState(EMPTY_FORM);
//   const [editSaving, setEditSaving] = useState(false);

//   /* Delete */
//   const [deleteTarget, setDeleteTarget] = useState(null); // 'bulk' | id

//   /* Drag-drop reorder */
//   const [dragging, setDragging]     = useState(null);
//   const [dragOver2, setDragOver2]   = useState(null);

//   /* ── Fetch ── */
//   const fetchItems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/gallery?admin=true");
//       setItems(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load gallery.");
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchItems(); }, [fetchItems]);

//   /* ── Filtered ── */
//   const filtered = items.filter(it => {
//     const q = search.toLowerCase();
//     const matchS = !search || it.title?.toLowerCase().includes(q) || it.description?.toLowerCase().includes(q) || it.category?.toLowerCase().includes(q);
//     const matchC = filterCat === "All" || it.category === filterCat;
//     const matchT = filterType === "all" || it.mediaType === filterType;
//     return matchS && matchC && matchT;
//   });

//   /* ── Selection helpers ── */
//   const toggleSelect = (id) => {
//     setSelected(s => {
//       const n = new Set(s);
//       n.has(id) ? n.delete(id) : n.add(id);
//       return n;
//     });
//   };
//   const selectAll = () => setSelected(new Set(filtered.map(i => i._id)));
//   const clearSelect = () => { setSelected(new Set()); setSelectMode(false); };

//   /* ── Upload (file) ── */
//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const files = Array.from(e.dataTransfer?.files || e.target.files || []);
//     setUploadFiles(files);
//   };

//   const handleFileUpload = async () => {
//     if (!uploadFiles.length && uploadTab === "file") { toast.error("Select files first"); return; }
//     if (uploadTab === "url" && !uploadForm.url) { toast.error("Enter a URL"); return; }
//     if (!uploadForm.title) { toast.error("Title is required"); return; }

//     setUploading(true);
//     try {
//       if (uploadTab === "url") {
//         await api.post("/gallery", uploadForm);
//         toast.success("Item added!");
//       } else {
//         // Upload each file
//         for (const file of uploadFiles) {
//           const fd = new FormData();
//           fd.append("file", file);
//           fd.append("title", uploadForm.title || file.name);
//           fd.append("description", uploadForm.description);
//           fd.append("category", uploadForm.category);
//           fd.append("mediaType", file.type.startsWith("video") ? "video" : "image");
//           await api.post("/upload", fd);
//         }
//         toast.success(`${uploadFiles.length} item(s) uploaded!`);
//       }
//       setUploadForm(EMPTY_FORM);
//       setUploadFiles([]);
//       setShowUpload(false);
//       await fetchItems();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   /* ── Edit ── */
//   const openEdit = (item) => {
//     setEditItem(item);
//     setEditForm({ title: item.title || "", description: item.description || "", category: item.category || "", mediaType: item.mediaType || "image", url: item.url || "" });
//   };

//   const saveEdit = async () => {
//     setEditSaving(true);
//     try {
//       await api.put(`/gallery/${editItem._id}`, editForm);
//       setItems(it => it.map(i => i._id === editItem._id ? { ...i, ...editForm } : i));
//       toast.success("Updated!");
//       setEditItem(null);
//     } catch {
//       toast.error("Update failed.");
//     } finally {
//       setEditSaving(false);
//     }
//   };

//   /* ── Toggle Featured ── */
//   const toggleFeatured = async (item) => {
//     try {
//       await api.put(`/gallery/${item._id}`, { ...item, featured: !item.featured });
//       setItems(it => it.map(i => i._id === item._id ? { ...i, featured: !i.featured } : i));
//       toast.success(item.featured ? "Removed from featured." : "Set as featured!");
//     } catch {
//       toast.error("Failed to update.");
//     }
//   };

//   /* ── Delete ── */
//   const handleDelete = async () => {
//     try {
//       if (deleteTarget === "bulk") {
//         await Promise.all([...selected].map(id => api.delete(`/gallery/${id}`)));
//         setItems(it => it.filter(i => !selected.has(i._id)));
//         toast.success(`${selected.size} item(s) deleted.`);
//         clearSelect();
//       } else {
//         await api.delete(`/gallery/${deleteTarget}`);
//         setItems(it => it.filter(i => i._id !== deleteTarget));
//         toast.success("Item deleted.");
//       }
//     } catch {
//       toast.error("Delete failed.");
//     } finally {
//       setDeleteTarget(null);
//     }
//   };

//   /* ── Drag-drop reorder ── */
//   const handleDragStart = (id) => setDragging(id);
//   const handleDragEnter = (id) => setDragOver2(id);
//   const handleDragEnd   = async () => {
//     if (!dragging || !dragOver2 || dragging === dragOver2) { setDragging(null); setDragOver2(null); return; }
//     const arr = [...items];
//     const fromIdx = arr.findIndex(i => i._id === dragging);
//     const toIdx   = arr.findIndex(i => i._id === dragOver2);
//     const [moved] = arr.splice(fromIdx, 1);
//     arr.splice(toIdx, 0, moved);
//     setItems(arr);
//     setDragging(null);
//     setDragOver2(null);
//     // Persist order
//     try {
//       await api.put("/gallery/reorder", { order: arr.map(i => i._id) });
//       toast.success("Order saved.");
//     } catch {
//       toast("Order saved locally (API not available)", { icon: "ℹ️" });
//     }
//   };

//   const stats = {
//     total:    items.length,
//     images:   items.filter(i => i.mediaType !== "video").length,
//     videos:   items.filter(i => i.mediaType === "video").length,
//     featured: items.filter(i => i.featured).length,
//   };

//   /* ══════════════════ RENDER ══════════════════ */
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

//       {/* ── Header ── */}
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <div>
//           <h1 className="font-display font-bold text-2xl md:text-3xl text-ink">Gallery Manager</h1>
//           <p className="text-slate text-sm mt-1">
//             {stats.total} items &nbsp;·&nbsp;
//             <span className="text-sky-400">{stats.images} images</span> &nbsp;·&nbsp;
//             <span className="text-purple-400">{stats.videos} videos</span> &nbsp;·&nbsp;
//             <span className="text-marigold">{stats.featured} featured</span>
//           </p>
//         </div>
//         <div className="flex gap-2 flex-wrap">
//           {selectMode ? (
//             <>
//               <button onClick={selectAll}
//                 className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
//                 <FiCheckSquare size={14} /> Select All ({filtered.length})
//               </button>
//               {selected.size > 0 && (
//                 <button onClick={() => setDeleteTarget("bulk")}
//                   className="flex items-center gap-1.5 text-sm bg-red-500/15 border border-red-400/30 text-red-400 px-4 py-2 rounded-full hover:bg-red-500/25 transition-colors">
//                   <FiTrash2 size={14} /> Delete ({selected.size})
//                 </button>
//               )}
//               <button onClick={clearSelect}
//                 className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
//                 <FiX size={14} /> Cancel
//               </button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => setSelectMode(true)}
//                 className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
//                 <FiCheckSquare size={14} /> Select
//               </button>
//               <button onClick={() => setShowUpload(true)}
//                 className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-5 py-2 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all text-sm">
//                 <FiPlus size={15} /> Add Media
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── Upload Panel ── */}
//       {showUpload && (
//         <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
//           <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/[0.015]">
//             <h2 className="font-display font-bold text-base text-ink flex items-center gap-2">
//               <FiUpload size={16} className="text-marigold" /> Add Media
//             </h2>
//             <button onClick={() => { setShowUpload(false); setUploadFiles([]); setUploadForm(EMPTY_FORM); }}
//               className="text-slate hover:text-ink"><FiX size={18} /></button>
//           </div>

//           {/* Tab toggle */}
//           <div className="flex border-b border-white/8">
//             {[{ id:"file", icon:FiUpload, label:"Upload File" }, { id:"url", icon:FiLink, label:"Add by URL" }].map(tab => (
//               <button key={tab.id} onClick={() => setUploadTab(tab.id)}
//                 className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
//                   uploadTab === tab.id ? "text-marigold border-b-2 border-marigold" : "text-slate hover:text-ink"
//                 }`}>
//                 <tab.icon size={14} />{tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="p-6 space-y-5">
//             {uploadTab === "file" ? (
//               /* ── File drop zone ── */
//               <div
//                 onDragOver={e => { e.preventDefault(); setDragOver(true); }}
//                 onDragLeave={() => setDragOver(false)}
//                 onDrop={handleFileDrop}
//                 onClick={() => fileInputRef.current?.click()}
//                 className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
//                   dragOver ? "border-marigold bg-marigold/5" : "border-white/15 hover:border-marigold/50"
//                 }`}>
//                 <FiUpload size={32} className="mx-auto text-marigold mb-3" />
//                 <p className="text-sm font-semibold text-ink mb-1">Drag & drop files here</p>
//                 <p className="text-xs text-slate">or click to browse · images & videos · max 10MB each</p>
//                 <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileDrop} />
//               </div>
//             ) : (
//               /* ── URL input ── */
//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">Media URL *</label>
//                   <input value={uploadForm.url} onChange={e => setUploadForm(f => ({ ...f, url: e.target.value }))}
//                     placeholder="https://example.com/image.jpg"
//                     className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
//                 </div>
//                 <div className="flex gap-3">
//                   {["image","video"].map(t => (
//                     <button key={t} onClick={() => setUploadForm(f => ({ ...f, mediaType: t }))}
//                       className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
//                         uploadForm.mediaType === t ? "bg-marigold/15 border-marigold/40 text-marigold" : "border-white/10 text-slate hover:border-white/25"
//                       }`}>
//                       {t === "image" ? <FiImage size={13} /> : <FiVideo size={13} />}
//                       {t.charAt(0).toUpperCase() + t.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Preview selected files */}
//             {uploadFiles.length > 0 && (
//               <div className="flex gap-2 flex-wrap">
//                 {uploadFiles.map((f, i) => (
//                   <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 bg-white/5 flex items-center justify-center">
//                     {f.type.startsWith("image") ? (
//                       <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
//                     ) : (
//                       <FiVideo size={20} className="text-slate" />
//                     )}
//                     <button onClick={() => setUploadFiles(fs => fs.filter((_, j) => j !== i))}
//                       className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
//                       <FiX size={9} className="text-white" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Common fields */}
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Title *</label>
//                 <input value={uploadForm.title} onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))}
//                   placeholder="e.g. Health Camp 2024"
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Category</label>
//                 <select value={uploadForm.category} onChange={e => setUploadForm(f => ({ ...f, category: e.target.value }))}
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors">
//                   <option value="">Select…</option>
//                   {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-semibold mb-2">Description</label>
//                 <input value={uploadForm.description} onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))}
//                   placeholder="Short caption for this media"
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-1">
//               <button onClick={() => { setShowUpload(false); setUploadFiles([]); setUploadForm(EMPTY_FORM); }}
//                 className="px-5 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleFileUpload} disabled={uploading}
//                 className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
//                 {uploading ? <><FiRefreshCw size={14} className="animate-spin" /> Uploading…</> : <><FiUpload size={14} /> Upload</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Filters ── */}
//       <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
//         {/* Search */}
//         <div className="relative max-w-xs w-full">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" size={14} />
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search media…"
//             className="w-full pl-9 pr-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-ink placeholder:text-slate focus:outline-none focus:border-marigold/50 transition-colors" />
//           {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink"><FiX size={13} /></button>}
//         </div>

//         {/* Type filter */}
//         <div className="flex gap-2">
//           {[["all","All"],["image","Images"],["video","Videos"]].map(([val, label]) => (
//             <button key={val} onClick={() => setFilterType(val)}
//               className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
//                 filterType === val ? "bg-marigold text-white" : "bg-white/[0.04] border border-white/10 text-slate hover:border-marigold/40"
//               }`}>{label}</button>
//           ))}
//         </div>

//         {/* Category filter */}
//         <div className="flex gap-2 flex-wrap">
//           {["All", ...CATEGORIES].map(cat => (
//             <button key={cat} onClick={() => setFilterCat(cat)}
//               className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
//                 filterCat === cat ? "bg-terracotta/20 border border-terracotta/40 text-terracotta" : "bg-white/[0.03] border border-white/10 text-slate hover:border-terracotta/30"
//               }`}>{cat}</button>
//           ))}
//         </div>
//       </div>

//       {/* ── Drag hint ── */}
//       {!selectMode && items.length > 1 && (
//         <p className="text-xs text-slate/50 flex items-center gap-1.5">
//           <FiMove size={11} /> Drag cards to reorder gallery display order
//         </p>
//       )}

//       {/* ── Grid ── */}
//       {loading ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {Array.from({ length: 10 }).map((_, i) => (
//             <div key={i} className="aspect-square rounded-card bg-white/[0.04] animate-pulse" />
//           ))}
//         </div>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-20 text-slate">
//           {items.length === 0
//             ? <><p className="text-lg mb-2">Gallery is empty</p><p className="text-sm">Click "Add Media" to upload photos and videos.</p></>
//             : <p>No items match your filters.</p>
//           }
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {filtered.map(item => (
//             <div
//               key={item._id}
//               draggable={!selectMode}
//               onDragStart={() => handleDragStart(item._id)}
//               onDragEnter={() => handleDragEnter(item._id)}
//               onDragEnd={handleDragEnd}
//               onDragOver={e => e.preventDefault()}
//               onClick={() => selectMode && toggleSelect(item._id)}
//               className={`group relative aspect-square rounded-card overflow-hidden border transition-all duration-200 cursor-pointer
//                 ${selectMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}
//                 ${dragging === item._id ? "opacity-40 scale-95" : ""}
//                 ${dragOver2 === item._id && dragging !== item._id ? "border-marigold scale-105 shadow-lg shadow-marigold/20" : "border-white/10 hover:border-white/25"}
//                 ${selected.has(item._id) ? "ring-2 ring-marigold border-marigold" : ""}
//               `}
//             >
//               <MediaThumb item={item} className="absolute inset-0" />

//               {/* Dark overlay on hover */}
//               <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-200" />

//               {/* Select checkbox */}
//               {selectMode && (
//                 <div className="absolute top-2 left-2 z-10">
//                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                     selected.has(item._id) ? "bg-marigold border-marigold" : "bg-black/50 border-white/50"
//                   }`}>
//                     {selected.has(item._id) && <FiCheck size={12} className="text-white" />}
//                   </div>
//                 </div>
//               )}

//               {/* Featured badge */}
//               {item.featured && (
//                 <div className="absolute top-2 right-2 z-10">
//                   <span className="w-6 h-6 rounded-full bg-marigold flex items-center justify-center shadow-md">
//                     <FiStar size={11} className="text-white fill-white" />
//                   </span>
//                 </div>
//               )}

//               {/* Category badge */}
//               {item.category && (
//                 <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
//                   {!selectMode && (
//                     <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
//                       {item.category}
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* Drag handle */}
//               {!selectMode && (
//                 <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
//                   <div className="w-6 h-6 rounded bg-black/60 backdrop-blur-sm flex items-center justify-center">
//                     <FiMove size={11} className="text-white" />
//                   </div>
//                 </div>
//               )}

//               {/* Title overlay */}
//               <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
//                 <p className="text-white text-[11px] font-semibold truncate leading-tight">{item.title}</p>
//                 {item.description && <p className="text-white/60 text-[10px] truncate mt-0.5">{item.description}</p>}
//               </div>

//               {/* Action buttons */}
//               {!selectMode && (
//                 <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
//                   {/* Featured */}
//                   <button onClick={e => { e.stopPropagation(); toggleFeatured(item); }}
//                     title={item.featured ? "Remove featured" : "Set featured"}
//                     className={`w-7 h-7 rounded-full flex items-center justify-center shadow transition-colors ${
//                       item.featured ? "bg-marigold text-white" : "bg-black/60 backdrop-blur-sm text-white hover:bg-marigold"
//                     }`}>
//                     <FiStar size={12} className={item.featured ? "fill-white" : ""} />
//                   </button>
//                   {/* Edit */}
//                   <button onClick={e => { e.stopPropagation(); openEdit(item); }}
//                     className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-marigold/80 transition-colors shadow">
//                     <FiEdit2 size={12} />
//                   </button>
//                   {/* Delete */}
//                   <button onClick={e => { e.stopPropagation(); setDeleteTarget(item._id); }}
//                     className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-colors shadow">
//                     <FiTrash2 size={12} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Edit Modal ── */}
//       {editItem && (
//         <div className="fixed inset-0 bg-ink/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-chalk border border-white/15 rounded-card p-6 max-w-lg w-full shadow-2xl space-y-5">
//             <div className="flex items-center justify-between">
//               <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
//                 <FiEdit2 size={16} className="text-marigold" /> Edit Media
//               </h3>
//               <button onClick={() => setEditItem(null)} className="text-slate hover:text-ink"><FiX size={18} /></button>
//             </div>

//             {/* Preview */}
//             <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-white/5">
//               <MediaThumb item={editItem} className="w-full h-full" />
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Title *</label>
//                 <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Category</label>
//                 <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors">
//                   <option value="">Select…</option>
//                   {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-semibold mb-2">Description</label>
//                 <input value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-semibold mb-2">Media URL</label>
//                 <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))}
//                   className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm font-mono transition-colors" />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 pt-1">
//               <button onClick={() => setEditItem(null)}
//                 className="px-5 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
//                 Cancel
//               </button>
//               <button onClick={saveEdit} disabled={editSaving}
//                 className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
//                 {editSaving ? <><FiRefreshCw size={14} className="animate-spin" /> Saving…</> : <><FiSave size={14} /> Save Changes</>}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Delete Confirm Modal ── */}
//       {deleteTarget && (
//         <div className="fixed inset-0 bg-ink/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-chalk border border-white/15 rounded-card p-6 max-w-sm w-full shadow-2xl">
//             <div className="w-12 h-12 rounded-full bg-red-400/15 flex items-center justify-center mx-auto mb-4">
//               <FiTrash2 size={22} className="text-red-400" />
//             </div>
//             <h3 className="font-display font-bold text-lg text-center text-ink mb-2">
//               {deleteTarget === "bulk" ? `Delete ${selected.size} items?` : "Delete this item?"}
//             </h3>
//             <p className="text-slate text-sm text-center mb-6">This cannot be undone.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setDeleteTarget(null)}
//                 className="flex-1 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
//                 Cancel
//               </button>
//               <button onClick={handleDelete}
//                 className="flex-1 py-2.5 rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiUpload, FiTrash2, FiEdit2, FiStar, FiX, FiCheck,
  FiSearch, FiLink, FiImage, FiVideo, FiRefreshCw,
  FiSave, FiCheckSquare, FiMove, FiPlus,
} from "react-icons/fi";
import api from "../../utils/api";
import toast from "react-hot-toast";

const CATEGORIES = ["Education", "Healthcare", "Events", "Women Empowerment", "Environment"];
const EMPTY_FORM = {
  title: "", description: "", category: "", mediaType: "image", url: "",
};

/* ── helpers ── */
function MediaThumb({ item, className = "" }) {
  if (item.mediaType === "video") {
    return (
      <div className={`relative bg-black/40 flex items-center justify-center ${className}`}>
        <video src={item.url} className="w-full h-full object-cover opacity-70" muted preload="metadata" />
        <FiVideo className="absolute text-white/80" size={20} />
      </div>
    );
  }
  return (
    <img src={item.url} alt={item.title}
      className={`w-full h-full object-cover ${className}`}
      onError={e => { e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=60"; }} />
  );
}

/* ══════════════════════════════════════════════ */
export default function AdminGallery() {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [filterCat, setFilterCat]   = useState("All");
  const [filterType, setFilterType] = useState("all");

  /* Selection */
  const [selected, setSelected]     = useState(new Set());
  const [selectMode, setSelectMode] = useState(false);

  /* Upload panel */
  const [showUpload, setShowUpload] = useState(false);
  const [uploadTab, setUploadTab]   = useState("file");
  const [uploadForm, setUploadForm] = useState(EMPTY_FORM);
  const [uploading, setUploading]   = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [dragOver, setDragOver]     = useState(false);
  const fileInputRef = useRef(null);

  /* Edit modal */
  const [editItem, setEditItem]     = useState(null);
  const [editForm, setEditForm]     = useState(EMPTY_FORM);
  const [editSaving, setEditSaving] = useState(false);

  /* Delete */
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* Drag-drop reorder */
  const [dragging, setDragging]     = useState(null);
  const [dragOver2, setDragOver2]   = useState(null);

  /* ── Fetch ── */
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/gallery?admin=true");
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load gallery.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  /* ── Filtered ── */
  const filtered = items.filter(it => {
    const q = search.toLowerCase();
    const matchS = !search || it.title?.toLowerCase().includes(q) || it.description?.toLowerCase().includes(q) || it.category?.toLowerCase().includes(q);
    const matchC = filterCat === "All" || it.category === filterCat;
    const matchT = filterType === "all" || it.mediaType === filterType;
    return matchS && matchC && matchT;
  });

  /* ── Selection helpers ── */
  const toggleSelect = (id) => {
    setSelected(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const selectAll  = () => setSelected(new Set(filtered.map(i => i._id)));
  const clearSelect = () => { setSelected(new Set()); setSelectMode(false); };

  /* ── Upload ── */
  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer?.files || e.target.files || []);
    setUploadFiles(files);
  };

  // ✅ FIXED: upload file → get URL → save to gallery DB
  const handleFileUpload = async () => {
    if (uploadTab === "file" && !uploadFiles.length) { toast.error("Select files first"); return; }
    if (uploadTab === "url" && !uploadForm.url) { toast.error("Enter a URL"); return; }
    if (!uploadForm.title) { toast.error("Title is required"); return; }
    setUploading(true);
    try {
      if (uploadTab === "url") {
        // URL mode — directly save to gallery
        await api.post("/gallery", uploadForm);
        toast.success("Item added!");
      } else {
        // File mode — upload file first, then save URL to gallery
        for (const file of uploadFiles) {
          // Step 1: Upload file to /api/upload, get back the URL
          const fd = new FormData();
          fd.append("file", file);
          const { data: uploadData } = await api.post("/upload", fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          // Step 2: Save gallery record with the returned URL
          await api.post("/gallery", {
            title: uploadForm.title || file.name,
            description: uploadForm.description,
            category: uploadForm.category,
            mediaType: file.type.startsWith("video") ? "video" : "image",
            url: uploadData.url, // e.g. /uploads/1234567890-123456789.jpg
          });
        }
        toast.success(`${uploadFiles.length} item(s) uploaded!`);
      }
      setUploadForm(EMPTY_FORM);
      setUploadFiles([]);
      setShowUpload(false);
      await fetchItems();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* ── Edit ── */
  const openEdit = (item) => {
    setEditItem(item);
    setEditForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      mediaType: item.mediaType || "image",
      url: item.url || "",
    });
  };

  const saveEdit = async () => {
    setEditSaving(true);
    try {
      await api.put(`/gallery/${editItem._id}`, editForm);
      setItems(it => it.map(i => i._id === editItem._id ? { ...i, ...editForm } : i));
      toast.success("Updated!");
      setEditItem(null);
    } catch {
      toast.error("Update failed.");
    } finally {
      setEditSaving(false);
    }
  };

  /* ── Toggle Featured ── */
  const toggleFeatured = async (item) => {
    try {
      await api.put(`/gallery/${item._id}`, { ...item, featured: !item.featured });
      setItems(it => it.map(i => i._id === item._id ? { ...i, featured: !i.featured } : i));
      toast.success(item.featured ? "Removed from featured." : "Set as featured!");
    } catch {
      toast.error("Failed to update.");
    }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    try {
      if (deleteTarget === "bulk") {
        await Promise.all([...selected].map(id => api.delete(`/gallery/${id}`)));
        setItems(it => it.filter(i => !selected.has(i._id)));
        toast.success(`${selected.size} item(s) deleted.`);
        clearSelect();
      } else {
        await api.delete(`/gallery/${deleteTarget}`);
        setItems(it => it.filter(i => i._id !== deleteTarget));
        toast.success("Item deleted.");
      }
    } catch {
      toast.error("Delete failed.");
    } finally {
      setDeleteTarget(null);
    }
  };

  /* ── Drag-drop reorder ── */
  const handleDragStart = (id) => setDragging(id);
  const handleDragEnter = (id) => setDragOver2(id);
  const handleDragEnd   = async () => {
    if (!dragging || !dragOver2 || dragging === dragOver2) {
      setDragging(null); setDragOver2(null); return;
    }
    const arr = [...items];
    const fromIdx = arr.findIndex(i => i._id === dragging);
    const toIdx   = arr.findIndex(i => i._id === dragOver2);
    const [moved] = arr.splice(fromIdx, 1);
    arr.splice(toIdx, 0, moved);
    setItems(arr);
    setDragging(null);
    setDragOver2(null);
    try {
      await api.put("/gallery/reorder", { order: arr.map(i => i._id) });
      toast.success("Order saved.");
    } catch {
      toast("Order saved locally (API not available)", { icon: "ℹ️" });
    }
  };

  const stats = {
    total:    items.length,
    images:   items.filter(i => i.mediaType !== "video").length,
    videos:   items.filter(i => i.mediaType === "video").length,
    featured: items.filter(i => i.featured).length,
  };

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-ink">Gallery Manager</h1>
          <p className="text-slate text-sm mt-1">
            {stats.total} items &nbsp;·&nbsp;
            <span className="text-sky-400">{stats.images} images</span> &nbsp;·&nbsp;
            <span className="text-purple-400">{stats.videos} videos</span> &nbsp;·&nbsp;
            <span className="text-marigold">{stats.featured} featured</span>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {selectMode ? (
            <>
              <button onClick={selectAll}
                className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
                <FiCheckSquare size={14} /> Select All ({filtered.length})
              </button>
              {selected.size > 0 && (
                <button onClick={() => setDeleteTarget("bulk")}
                  className="flex items-center gap-1.5 text-sm bg-red-500/15 border border-red-400/30 text-red-400 px-4 py-2 rounded-full hover:bg-red-500/25 transition-colors">
                  <FiTrash2 size={14} /> Delete ({selected.size})
                </button>
              )}
              <button onClick={clearSelect}
                className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
                <FiX size={14} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setSelectMode(true)}
                className="flex items-center gap-1.5 text-sm border border-white/15 px-4 py-2 rounded-full text-slate hover:text-ink transition-colors">
                <FiCheckSquare size={14} /> Select
              </button>
              <button onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-5 py-2 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all text-sm">
                <FiPlus size={15} /> Add Media
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Upload Panel ── */}
      {showUpload && (
        <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/[0.015]">
            <h2 className="font-display font-bold text-base text-ink flex items-center gap-2">
              <FiUpload size={16} className="text-marigold" /> Add Media
            </h2>
            <button onClick={() => { setShowUpload(false); setUploadFiles([]); setUploadForm(EMPTY_FORM); }}
              className="text-slate hover:text-ink"><FiX size={18} /></button>
          </div>

          {/* Tab toggle */}
          <div className="flex border-b border-white/8">
            {[{ id:"file", icon:FiUpload, label:"Upload File" }, { id:"url", icon:FiLink, label:"Add by URL" }].map(tab => (
              <button key={tab.id} onClick={() => setUploadTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors ${
                  uploadTab === tab.id ? "text-marigold border-b-2 border-marigold" : "text-slate hover:text-ink"
                }`}>
                <tab.icon size={14} />{tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">
            {uploadTab === "file" ? (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  dragOver ? "border-marigold bg-marigold/5" : "border-white/15 hover:border-marigold/50"
                }`}>
                <FiUpload size={32} className="mx-auto text-marigold mb-3" />
                <p className="text-sm font-semibold text-ink mb-1">Drag & drop files here</p>
                <p className="text-xs text-slate">or click to browse · images & videos · max 10MB each</p>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileDrop} />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold mb-2">Media URL *</label>
                  <input value={uploadForm.url} onChange={e => setUploadForm(f => ({ ...f, url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
                </div>
                <div className="flex gap-3">
                  {["image","video"].map(t => (
                    <button key={t} onClick={() => setUploadForm(f => ({ ...f, mediaType: t }))}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                        uploadForm.mediaType === t ? "bg-marigold/15 border-marigold/40 text-marigold" : "border-white/10 text-slate hover:border-white/25"
                      }`}>
                      {t === "image" ? <FiImage size={13} /> : <FiVideo size={13} />}
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview selected files */}
            {uploadFiles.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {uploadFiles.map((f, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 bg-white/5 flex items-center justify-center">
                    {f.type.startsWith("image") ? (
                      <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <FiVideo size={20} className="text-slate" />
                    )}
                    <button onClick={() => setUploadFiles(fs => fs.filter((_, j) => j !== i))}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <FiX size={9} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Common fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input value={uploadForm.title} onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Health Camp 2024"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select value={uploadForm.category} onChange={e => setUploadForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors">
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <input value={uploadForm.description} onChange={e => setUploadForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short caption for this media"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => { setShowUpload(false); setUploadFiles([]); setUploadForm(EMPTY_FORM); }}
                className="px-5 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleFileUpload} disabled={uploading}
                className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
                {uploading
                  ? <><FiRefreshCw size={14} className="animate-spin" /> Uploading…</>
                  : <><FiUpload size={14} /> Upload</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
        <div className="relative max-w-xs w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" size={14} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search media…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-ink placeholder:text-slate focus:outline-none focus:border-marigold/50 transition-colors" />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink"><FiX size={13} /></button>}
        </div>
        <div className="flex gap-2">
          {[["all","All"],["image","Images"],["video","Videos"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilterType(val)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filterType === val ? "bg-marigold text-white" : "bg-white/[0.04] border border-white/10 text-slate hover:border-marigold/40"
              }`}>{label}</button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterCat === cat ? "bg-terracotta/20 border border-terracotta/40 text-terracotta" : "bg-white/[0.03] border border-white/10 text-slate hover:border-terracotta/30"
              }`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* ── Drag hint ── */}
      {!selectMode && items.length > 1 && (
        <p className="text-xs text-slate/50 flex items-center gap-1.5">
          <FiMove size={11} /> Drag cards to reorder gallery display order
        </p>
      )}

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-card bg-white/[0.04] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate">
          {items.length === 0
            ? <><p className="text-lg mb-2">Gallery is empty</p><p className="text-sm">Click "Add Media" to upload photos and videos.</p></>
            : <p>No items match your filters.</p>
          }
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div
              key={item._id}
              draggable={!selectMode}
              onDragStart={() => handleDragStart(item._id)}
              onDragEnter={() => handleDragEnter(item._id)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
              onClick={() => selectMode && toggleSelect(item._id)}
              className={`group relative aspect-square rounded-card overflow-hidden border transition-all duration-200
                ${selectMode ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}
                ${dragging === item._id ? "opacity-40 scale-95" : ""}
                ${dragOver2 === item._id && dragging !== item._id ? "border-marigold scale-105 shadow-lg shadow-marigold/20" : "border-white/10 hover:border-white/25"}
                ${selected.has(item._id) ? "ring-2 ring-marigold border-marigold" : ""}
              `}
            >
              <MediaThumb item={item} className="absolute inset-0" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-200" />

              {/* Select checkbox */}
              {selectMode && (
                <div className="absolute top-2 left-2 z-10">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selected.has(item._id) ? "bg-marigold border-marigold" : "bg-black/50 border-white/50"
                  }`}>
                    {selected.has(item._id) && <FiCheck size={12} className="text-white" />}
                  </div>
                </div>
              )}

              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="w-6 h-6 rounded-full bg-marigold flex items-center justify-center shadow-md">
                    <FiStar size={11} className="text-white fill-white" />
                  </span>
                </div>
              )}

              {/* Drag handle */}
              {!selectMode && (
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="w-6 h-6 rounded bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <FiMove size={11} className="text-white" />
                  </div>
                </div>
              )}

              {/* Category badge */}
              {item.category && !selectMode && (
                <div className="absolute top-2 left-10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-[9px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                <p className="text-white text-[11px] font-semibold truncate leading-tight">{item.title}</p>
                {item.description && <p className="text-white/60 text-[10px] truncate mt-0.5">{item.description}</p>}
              </div>

              {/* Action buttons */}
              {!selectMode && (
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button onClick={e => { e.stopPropagation(); toggleFeatured(item); }}
                    title={item.featured ? "Remove featured" : "Set featured"}
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow transition-colors ${
                      item.featured ? "bg-marigold text-white" : "bg-black/60 backdrop-blur-sm text-white hover:bg-marigold"
                    }`}>
                    <FiStar size={12} className={item.featured ? "fill-white" : ""} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); openEdit(item); }}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-marigold/80 transition-colors shadow">
                    <FiEdit2 size={12} />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setDeleteTarget(item._id); }}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-colors shadow">
                    <FiTrash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editItem && (
        <div className="fixed inset-0 bg-ink/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-chalk border border-white/15 rounded-card p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                <FiEdit2 size={16} className="text-marigold" /> Edit Media
              </h3>
              <button onClick={() => setEditItem(null)} className="text-slate hover:text-ink"><FiX size={18} /></button>
            </div>
            <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <MediaThumb item={editItem} className="w-full h-full" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors">
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <input value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">Media URL</label>
                <input value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none bg-transparent text-sm font-mono transition-colors" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button onClick={() => setEditItem(null)}
                className="px-5 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} disabled={editSaving}
                className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
                {editSaving
                  ? <><FiRefreshCw size={14} className="animate-spin" /> Saving…</>
                  : <><FiSave size={14} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-ink/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-chalk border border-white/15 rounded-card p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-400/15 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={22} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-center text-ink mb-2">
              {deleteTarget === "bulk" ? `Delete ${selected.size} items?` : "Delete this item?"}
            </h3>
            <p className="text-slate text-sm text-center mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
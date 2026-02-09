import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Video, Loader2, CheckCircle, AlertCircle, Home, LogOut, BarChart3, FolderOpen, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Analytics from '../components/Analytics';
import TestimonialsManager from '../components/TestimonialsManager';

interface UploadedFile {
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  path: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'media' | 'analytics' | 'testimonials'>('media');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  useEffect(() => {
    loadExistingFiles();
  }, []);

  const loadExistingFiles = async () => {
    setLoading(true);
    try {
      const { data: imageFiles } = await supabase.storage
        .from('images')
        .list('public', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      const { data: videoFiles } = await supabase.storage
        .from('videos')
        .list('public', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      const images: UploadedFile[] = (imageFiles || []).map(file => ({
        name: file.name,
        url: supabase.storage.from('images').getPublicUrl(`public/${file.name}`).data.publicUrl,
        type: 'image' as const,
        size: file.metadata?.size || 0,
        path: `public/${file.name}`,
      }));

      const videos: UploadedFile[] = (videoFiles || []).map(file => ({
        name: file.name,
        url: supabase.storage.from('videos').getPublicUrl(`public/${file.name}`).data.publicUrl,
        type: 'video' as const,
        size: file.metadata?.size || 0,
        path: `public/${file.name}`,
      }));

      setUploadedFiles([...images, ...videos]);
    } catch (err: any) {
      console.error('Error loading files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'video') => {
    setError('');
    setSuccess('');
    setUploading(true);
    setUploadProgress(`Upload de ${file.name}...`);

    try {
      const bucket = type === 'image' ? 'images' : 'videos';
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const uploadedFile: UploadedFile = {
        name: fileName,
        url: publicUrl,
        type,
        size: file.size,
        path: filePath,
      };

      setUploadedFiles((prev) => [uploadedFile, ...prev]);
      setSuccess(`${file.name} uploadé avec succès!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload');
      setTimeout(() => setError(''), 5000);
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image doit faire moins de 5MB');
        setTimeout(() => setError(''), 3000);
        return;
      }
      handleFileUpload(file, 'image');
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setError('La vidéo doit faire moins de 100MB');
        setTimeout(() => setError(''), 3000);
        return;
      }
      handleFileUpload(file, 'video');
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleDelete = async (file: UploadedFile) => {
    if (!confirm(`Supprimer ${file.name} ?`)) return;

    try {
      const bucket = file.type === 'image' ? 'images' : 'videos';

      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([file.path]);

      if (deleteError) throw deleteError;

      setUploadedFiles((prev) => prev.filter((f) => f.url !== file.url));
      setSuccess('Fichier supprimé');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[#000000] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Panneau <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Admin</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Retour au site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'media'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Médiathèque
            {activeTab === 'media' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'testimonials'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Avis
            {activeTab === 'testimonials' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'analytics'
                ? 'text-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
            {activeTab === 'analytics' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        </div>

        {activeTab === 'analytics' ? (
          <Analytics />
        ) : activeTab === 'testimonials' ? (
          <TestimonialsManager />
        ) : (
          <>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageSelect}
              disabled={uploading}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 hover:border-primary rounded-xl bg-slate-900/50 cursor-pointer transition-all h-48"
            >
              <ImageIcon className="w-12 h-12 text-primary mb-3" />
              <span className="text-white font-semibold mb-1">Uploader une image</span>
              <span className="text-gray-400 text-sm">JPG, PNG, GIF, WEBP (max 5MB)</span>
            </label>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleVideoSelect}
              disabled={uploading}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-700 hover:border-secondary rounded-xl bg-slate-900/50 cursor-pointer transition-all h-48"
            >
              <Video className="w-12 h-12 text-secondary mb-3" />
              <span className="text-white font-semibold mb-1">Uploader une vidéo</span>
              <span className="text-gray-400 text-sm">MP4, WEBM, MOV (max 100MB)</span>
            </label>
          </motion.div>
        </div>

        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4"
            >
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              <span className="text-blue-400">{uploadProgress}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-4"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">{success}</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-4"
            >
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              Médiathèque ({uploadedFiles.length} fichiers)
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : uploadedFiles.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              Aucun fichier uploadé pour le moment
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.url}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="w-full h-48 object-cover"
                      controls
                    />
                  )}
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          setSuccess('URL copiée!');
                          setTimeout(() => setSuccess(''), 2000);
                        }}
                        className="flex-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded transition-colors"
                      >
                        Copier URL
                      </button>
                      <button
                        onClick={() => handleDelete(file)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

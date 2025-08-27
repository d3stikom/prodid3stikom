import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions untuk database operations
// Tambahkan fungsi-fungsi ini ke file supabase.js yang sudah ada

// Generic CRUD operations
export const db = {
  // Program Studi
  async getProgramStudi() {
    const { data, error } = await supabase
      .from('program_studi')
      .select('*')
      .single()

    if (error) throw error
    return data
  },

  // Dosen
  async getDosen() {
    const { data, error } = await supabase
      .from('dosen')
      .select('*')
      .eq('status', 'aktif')
      .order('nama')

    if (error) throw error
    return data
  },

  // Berita
  async getBerita(limit = 10) {
    const { data, error } = await supabase
      .from('berita')
      .select(`
        *,
        dosen:author_id(nama)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getBeritaBySlug(slug) {
    const { data, error } = await supabase
      .from('berita')
      .select(`
        *,
        dosen:author_id(nama)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  },

  // Mata Kuliah
  async getMataKuliah() {
    const { data, error } = await supabase
      .from('mata_kuliah')
      .select('*')
      .order('semester', { ascending: true })
      .order('nama')

    if (error) throw error
    return data
  },

  // Kurikulum
  async getKurikulumAktif() {
    const { data, error } = await supabase
      .from('kurikulum')
      .select(`
        *,
        kurikulum_mata_kuliah(
          semester,
          wajib,
          mata_kuliah(*)
        )
      `)
      .eq('status', 'aktif')
      .single()

    if (error) throw error
    return data
  },

  // Galeri
  async getGaleri(limit = 12) {
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Mahasiswa
  async getMahasiswa() {
    const { data, error } = await supabase
      .from('mahasiswa')
      .select('*')
      .eq('status', 'aktif')
      .order('nim')

    if (error) throw error
    return data
  },

  // Prestasi
  async getPrestasi(limit = 10) {
    const { data, error } = await supabase
      .from('prestasi')
      .select(`
        *,
        mahasiswa:penerima_id(nama, nim)
      `)
      .eq('kategori', 'mahasiswa')
      .order('tahun', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Fasilitas
  async getFasilitas() {
    const { data, error } = await supabase
      .from('fasilitas')
      .select('*')
      .eq('status', 'aktif')
      .order('nama')

    if (error) throw error
    return data
  },

  // Kontak Info
  async getKontakInfo() {
    const { data, error } = await supabase
      .from('kontak_info')
      .select('*')
      .eq('aktif', true)
      .order('urutan')

    if (error) throw error
    return data
  },

  // Alumni
  async getAlumni(limit = 8) {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('tahun_lulus', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Portofolio
  // Portofolio
  async getPortofolio(limit = 20) {
    const { data, error } = await supabase
      .from('portofolio')
      .select(`
        *,
        mahasiswa:mahasiswa_id (
          nama,
          nim
        )
      `)
      .eq('status', 'aktif')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getPortofolioFeatured() {
    const { data, error } = await supabase
      .from('portofolio')
      .select(`
        *,
        mahasiswa:mahasiswa_id (
          nama,
          nim
        )
      `)
      .eq('status', 'aktif')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Skills
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        mahasiswa!mahasiswa_id (
          nama,
          nim
        )
      `)
      .eq('status', 'aktif')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getSkillsByCategory() {
    const { data, error } = await supabase
      .from('skills')
      .select('kategori, nama_skill, level')
      .eq('status', 'aktif')
      .order('kategori')

    if (error) throw error
    return data
  },

  async getPortofolio(limit = 20) {
    const { data, error } = await supabase
      .from('portofolio')
      .select(`
        *,
        mahasiswa!mahasiswa_id (
          nama,
          nim
        )
      `)
      .eq('status', 'aktif')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async getPortofolioFeatured() {
    const { data, error } = await supabase
      .from('portofolio')
      .select(`
        *,
        mahasiswa!mahasiswa_id (
          nama,
          nim
        )
      `)
      .eq('status', 'aktif')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },


  // Authentication functions
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Get user role from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role, profile_id, is_active')
      .eq('email', email)
      .single();
    
    if (userError) throw userError;
    if (!userData.is_active) throw new Error('Account is deactivated');
    
    return { ...data, role: userData.role, profile_id: userData.profile_id };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data: userData, error } = await supabase
      .from('users')
      .select('role, profile_id, is_active')
      .eq('email', user.email)
      .single();
    
    if (error) throw error;
    return { ...user, ...userData };
  },

  // Admin functions
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        dosen:profile_id(nama, nidn),
        mahasiswa:profile_id(nama, nim)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // CRUD functions for all tables
  // Get all data from any table
  async getAllData(tableName) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching ${tableName}:`, error);
      throw error;
    }
  },

  // Insert data to any table
  async insertData(tableName, data) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([data])
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      console.error(`Error inserting to ${tableName}:`, error);
      throw error;
    }
  },

  // Update data in any table
  async updateData(tableName, id, data) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return result[0];
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      throw error;
    }
  },

  // Delete data from any table
  async deleteData(tableName, id) {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      throw error;
    }
  },

  // Specific functions for complex operations
  async getKurikulumWithMataKuliah(kurikulumId) {
    try {
      const { data, error } = await supabase
        .from('kurikulum_mata_kuliah')
        .select(`
          *,
          kurikulum:kurikulum_id(*),
          mata_kuliah:mata_kuliah_id(*)
        `)
        .eq('kurikulum_id', kurikulumId);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching kurikulum with mata kuliah:', error);
      throw error;
    }
  },

  async getPortofolioWithMahasiswa() {
    try {
      const { data, error } = await supabase
        .from('portofolio')
        .select(`
          *,
          mahasiswa:mahasiswa_id(*)
        `);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching portofolio with mahasiswa:', error);
      throw error;
    }
  },

  async getSkillsWithMahasiswa() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select(`
          *,
          mahasiswa:mahasiswa_id(*)
        `);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching skills with mahasiswa:', error);
      throw error;
    }
  }
};
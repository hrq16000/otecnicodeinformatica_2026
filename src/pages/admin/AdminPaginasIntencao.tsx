import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "@/lib/router-compat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  adminAtualizarPagina,
  adminCriarPagina,
  adminExcluirPagina,
  adminListarPaginas,
  normalizarSlug,
  type PaginaEditorial,
  type PaginaEditorialInput,
} from "@/lib/paginasEditoriaisAdminApi";

/**
 * Páginas por sintoma e solução — criação, edição e publicação.
 *
 * Conteúdo autoral, com título, meta description e palavras-chave próprios.
 * A página publicada responde em /guias/<slug>; "indexável" controla a meta
 * robots (fail-closed: fora do índice enquanto não for marcada).
 */

const VAZIO: PaginaEditorialInput = {
  slug: "",
  tipo: "sintoma",
  titulo: "",
  meta_description: "",
  palavras_chave: [],
  resumo: "",
  conteudo: "",
  publicado: false,
  indexavel: false,
};

export default function AdminPaginasIntencao() {
  const { loading, session, isAdmin } = useAdminAuth();
  const [itens, setItens] = useState<PaginaEditorial[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<PaginaEditorialInput>(VAZIO);
  const [chaves, setChaves] = useState("");

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      setItens(await adminListarPaginas());
    } catch (e) {
      toast.error("Não foi possível carregar as páginas", {
        description: e instanceof Error ? e.message : undefined,
      });
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) void carregar();
  }, [isAdmin, carregar]);

  const limpar = () => {
    setEditandoId(null);
    setForm(VAZIO);
    setChaves("");
  };

  const editar = (p: PaginaEditorial) => {
    setEditandoId(p.id);
    setForm({
      slug: p.slug,
      tipo: p.tipo,
      titulo: p.titulo,
      meta_description: p.meta_description,
      palavras_chave: p.palavras_chave ?? [],
      resumo: p.resumo,
      conteudo: p.conteudo,
      publicado: p.publicado,
      indexavel: p.indexavel,
    });
    setChaves((p.palavras_chave ?? []).join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const salvar = async (publicarAgora?: boolean) => {
    const slug = normalizarSlug(form.slug || form.titulo);
    if (!slug || form.titulo.trim().length < 8) {
      toast.error("Informe um título e um endereço válidos");
      return;
    }
    if (form.conteudo.trim().length < 200) {
      toast.error("O conteúdo precisa ser próprio e completo (mínimo de 200 caracteres)");
      return;
    }
    const dados: PaginaEditorialInput = {
      ...form,
      slug,
      palavras_chave: chaves
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      publicado: publicarAgora ?? form.publicado,
    };
    setSalvando(true);
    try {
      if (editandoId) {
        await adminAtualizarPagina(editandoId, dados);
      } else {
        await adminCriarPagina(dados);
      }
      toast.success(dados.publicado ? "Página publicada" : "Rascunho salvo", {
        description: `/guias/${slug}`,
      });
      limpar();
      await carregar();
    } catch (e) {
      toast.error("Não foi possível salvar", {
        description: e instanceof Error ? e.message : undefined,
      });
    } finally {
      setSalvando(false);
    }
  };

  const alternarPublicacao = async (p: PaginaEditorial) => {
    try {
      await adminAtualizarPagina(p.id, { publicado: !p.publicado });
      await carregar();
    } catch (e) {
      toast.error("Não foi possível alterar a publicação", {
        description: e instanceof Error ? e.message : undefined,
      });
    }
  };

  const excluir = async (p: PaginaEditorial) => {
    if (!window.confirm(`Excluir definitivamente "${p.titulo}"?`)) return;
    try {
      await adminExcluirPagina(p.id);
      await carregar();
    } catch (e) {
      toast.error("Não foi possível excluir", {
        description: e instanceof Error ? e.message : undefined,
      });
    }
  };

  const contagens = useMemo(
    () => ({
      total: itens.length,
      publicadas: itens.filter((i) => i.publicado).length,
      indexaveis: itens.filter((i) => i.publicado && i.indexavel).length,
    }),
    [itens],
  );

  if (!loading && !session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Páginas por sintoma e solução | Administração</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-2xl font-bold mb-1">Páginas por sintoma e solução</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Conteúdo próprio, com título, meta description e palavras-chave por intenção de busca.
          Cada página publicada responde em <code>/guias/&lt;endereço&gt;</code>.
        </p>

        {!loading && session && !isAdmin && (
          <Card className="p-4 text-sm border-destructive/40">
            Sua conta não tem permissão de administrador.
          </Card>
        )}

        {isAdmin && (
          <>
            <Card className="p-5 mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{editandoId ? "Editar página" : "Nova página"}</h2>
                {editandoId && (
                  <Button variant="ghost" size="sm" onClick={limpar}>
                    Cancelar edição
                  </Button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="titulo">Título (aparece na busca)</Label>
                  <Input
                    id="titulo"
                    value={form.titulo}
                    onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    placeholder="Notebook desliga sozinho: o que verificar antes de levar à assistência"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Endereço da página</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    onBlur={(e) => setForm({ ...form, slug: normalizarSlug(e.target.value) })}
                    placeholder="notebook-desliga-sozinho"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.tipo === "sintoma"}
                    onChange={() => setForm({ ...form, tipo: "sintoma" })}
                  />
                  Sintoma
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.tipo === "solucao"}
                    onChange={() => setForm({ ...form, tipo: "solucao" })}
                  />
                  Solução
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.indexavel}
                    onChange={(e) => setForm({ ...form, indexavel: e.target.checked })}
                  />
                  Liberar para buscadores
                </label>
              </div>

              <div>
                <Label htmlFor="meta">Meta description</Label>
                <Textarea
                  id="meta"
                  rows={2}
                  maxLength={180}
                  value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  placeholder="O que a pessoa consegue verificar sozinha e quando vale procurar atendimento."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.meta_description.length}/180 caracteres
                </p>
              </div>

              <div>
                <Label htmlFor="chaves">Palavras-chave (separadas por vírgula)</Label>
                <Input
                  id="chaves"
                  value={chaves}
                  onChange={(e) => setChaves(e.target.value)}
                  placeholder="notebook desliga sozinho, superaquecimento, curitiba"
                />
              </div>

              <div>
                <Label htmlFor="resumo">Resposta rápida (1 parágrafo)</Label>
                <Textarea
                  id="resumo"
                  rows={3}
                  value={form.resumo}
                  onChange={(e) => setForm({ ...form, resumo: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  rows={14}
                  value={form.conteudo}
                  onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                  placeholder={"## Como verificar com segurança\n- Passo verificável\n- Limite claro\n\n## Quando procurar atendimento"}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use <code>## </code> para títulos e <code>- </code> para listas.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => void salvar(false)} variant="outline" disabled={salvando}>
                  Salvar rascunho
                </Button>
                <Button onClick={() => void salvar(true)} disabled={salvando}>
                  Publicar agora
                </Button>
              </div>
            </Card>

            <div className="flex gap-2 mb-3 text-xs">
              <Badge variant="secondary">{contagens.total} páginas</Badge>
              <Badge variant="secondary">{contagens.publicadas} publicadas</Badge>
              <Badge variant="secondary">{contagens.indexaveis} liberadas para buscadores</Badge>
            </div>

            {carregando ? (
              <p className="text-sm text-muted-foreground">Carregando…</p>
            ) : itens.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma página criada ainda.</p>
            ) : (
              <div className="space-y-3">
                {itens.map((p) => (
                  <Card key={p.id} className="p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant={p.publicado ? "default" : "secondary"}>
                        {p.publicado ? "Publicada" : "Rascunho"}
                      </Badge>
                      <Badge variant="outline">{p.tipo === "sintoma" ? "Sintoma" : "Solução"}</Badge>
                      {p.publicado && !p.indexavel && (
                        <Badge variant="outline">Fora das buscas</Badge>
                      )}
                    </div>
                    <p className="font-medium">{p.titulo}</p>
                    <p className="text-xs text-muted-foreground">/guias/{p.slug}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => editar(p)}>
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => void alternarPublicacao(p)}>
                        {p.publicado ? "Despublicar" : "Publicar"}
                      </Button>
                      {p.publicado && (
                        <a href={`/guias/${p.slug}`} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="ghost">
                            Ver página
                          </Button>
                        </a>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => void excluir(p)}>
                        Excluir
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

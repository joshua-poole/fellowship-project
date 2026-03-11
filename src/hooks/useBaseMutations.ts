import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useBaseMutations(baseId: string) {
  const router = useRouter();
  const utils = api.useUtils();

  const rename = api.base.update.useMutation({
    onMutate: async ({ id, name, color }) => {
      await utils.base.getById.cancel({ id });
      const prev = utils.base.getById.getData({ id });
      utils.base.getById.setData({ id }, (old) => old ? { ...old, name, color } : old);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.base.getById.setData({ id: baseId }, ctx.prev);
    },
    onSettled: () => void utils.base.getById.invalidate({ id: baseId }),
  });

  const remove = api.base.delete.useMutation({
    onSuccess: () => router.push("/"),
  });

  return { rename, remove };
}

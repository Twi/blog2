import LinkButton from "@/components/LinkButton.tsx";
import { author } from "@/data/site.ts";
import Input from "@/islands/Input.tsx";
import u from "@/utils/url.ts";
import IconShare from "$icons/share.tsx";
import { useState } from "preact/hooks";

interface MastodonShareProps {
  title: string;
}

export default function MastodonShare({ title }: MastodonShareProps) {
  const [serverURL, setServerURL] = useState("");

  return (
    <details>
      <summary>Share on Mastodon</summary>
      <div class="flex">
        <Input
          type="text"
          class="form-input mt-1 block max-w-full flex-row text-gray-900"
          placeholder="https://tech.lgbt"
          value={serverURL}
          onInput={(e) => setServerURL(e.target.value)}
        />
        <LinkButton
          class="text-gray-900 text-bold flex-row"
          onClick={() => {
            if (serverURL == "") {
              alert("please enter a URL");
              return;
            }

            const text = `${title}

${u()}

${author.mastodon.mention}`;

            const mastodonURL = u(serverURL + "/share", {
              text,
              visibility: "public",
            });
            window.open(mastodonURL, "_blank");
          }}
        >
          <IconShare />
        </LinkButton>
      </div>
    </details>
  );
}

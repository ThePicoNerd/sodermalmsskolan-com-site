import { Theme } from "@emotion/react";
import React, { Fragment, FunctionComponent } from "react";
import { useDayMenu } from "../../lib/food/hooks/menu";
import Skeleton from "../Skeleton";
import Emphasis from "../text/atomics/Emphasis";

/**
 * A short text describing today's lunch.
 */
const MenuText: FunctionComponent = () => {
  const { data, loading } = useDayMenu();

  const fallback = loading ? <Skeleton count={3} /> : "Menyn är inte tillgänglig.";

  return (
    <>
      {data?.dishes?.length > 0 ? (
        <>
          Det blir
          {" "}
          {data?.dishes?.map((dish, index) => (
            <Fragment key={dish?.id || index}>
              {index !== 0 ? " och " : null}
              <Emphasis
                css={(theme: Theme) => ({
                  color: theme.color.text.primary,
                })}
              >
                {dish?.title || <Skeleton />}
              </Emphasis>
            </Fragment>
          ))}
          {" "}
          till lunch.
          {" "}
        </>
      ) : fallback}
    </>
  );
};

export default MenuText;

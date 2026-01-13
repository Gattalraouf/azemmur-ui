'use client';

import * as React from 'react';

import { Label } from '@workspace/ui/components/ui/Inputs/label';
import { Slider } from '@workspace/ui/components/ui/Inputs/slider';
import { Input } from '@workspace/ui/components/ui/Inputs/input';
import { cn } from '@workspace/ui/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/ui/Inputs/select';
import { Switch } from '@workspace/ui/components/ui/Inputs/switch';
import { IconChevronsDown as ChevronsUpDown } from '@tabler/icons-react';

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

type BaseBindNumber = { value: number };
type BindNumberSlider = BaseBindNumber & {
  min: number;
  max: number;
  step: number;
};
type BindNumberOptions = BaseBindNumber & { options: Record<string, number> };
type BindNumber = BindNumberSlider | BindNumberOptions | BaseBindNumber;

type BindString = { value: string; options?: Record<string, string> };
type BindBoolean = { value: boolean };
type BindOptions = {
  value: string | number | boolean;
  options: Record<string, string | number | boolean>;
};

type Bind = BindNumber | BindString | BindBoolean | BindOptions;
type FlatBinds = Record<string, Bind>;
type NestedBinds = Record<string, FlatBinds>;
type Binds = FlatBinds | NestedBinds;

interface ControlledTweakpaneProps {
  binds: Binds;
  onBindsChange?: (binds: Binds) => void;
}

interface UncontrolledTweakpaneProps {
  initialBinds: Binds;
  onBindsChange?: (binds: Binds) => void;
}

type TweakpaneProps = ControlledTweakpaneProps | UncontrolledTweakpaneProps;

/* -------------------------------------------------------------------------- */
/*                              Numeric Input                                 */
/* -------------------------------------------------------------------------- */

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Numeric input that syncs string display and numeric state, respecting min, max, and step.
 */
const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onValueChange,
  className,
  min,
  max,
  step,
  ...props
}) => {
  const [display, setDisplay] = React.useState(value.toString());

  React.useEffect(() => setDisplay(value.toString()), [value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setDisplay(v);
      if (v !== '') {
        let n = Number(v);
        if (!isNaN(n)) {
          if (min !== undefined && n < min) n = min;
          if (max !== undefined && n > max) n = max;
          if (step !== undefined) {
            n = Math.round(n / step) * step;
            n = parseFloat(n.toFixed(5));
          }
          onValueChange(n);
        }
      }
    },
    [min, max, step, onValueChange],
  );

  const handleBlur = React.useCallback(
    () => setDisplay(value.toString()),
    [value],
  );

  return (
    <Input
      {...props}
      className={cn(
        '[&[type="number"]::-webkit-inner-spin-button]:appearance-none [&[type="number"]::-webkit-outer-spin-button]:appearance-none text-sm',
        className,
      )}
      min={min}
      max={max}
      step={step}
      autoComplete="off"
      type="number"
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                             Type Utilities                                 */
/* -------------------------------------------------------------------------- */

const isNestedBinds = (binds: Binds): binds is NestedBinds =>
  Object.values(binds).every(
    (v) =>
      typeof v === 'object' &&
      v !== null &&
      !('value' in v) &&
      Object.values(v).every(
        (inner) =>
          typeof inner === 'object' && inner !== null && 'value' in inner,
      ),
  );

/* -------------------------------------------------------------------------- */
/*                               Render Helpers                               */
/* -------------------------------------------------------------------------- */

/**
 * Renders number bindings — as slider + input, or select if options exist.
 */
const renderNumber = (
  key: string,
  bind: BindNumber,
  onChange: (value: number) => void,
) => {
  if ('min' in bind && 'max' in bind) {
    return (
      <div key={key} className="flex flex-row gap-2.5">
        <div className="w-[80px] flex items-center shrink-0 min-w-0">
          <Label
            htmlFor={key}
            className="truncate text-current/80 block leading-[1.2]"
          >
            {key}
          </Label>
        </div>

        <Slider
          min={bind.min}
          max={bind.max}
          step={bind.step}
          value={[bind.value]}
          onValueChange={(v) => onChange(v[0] ?? 0)}
        />

        <NumericInput
          id={key}
          value={bind.value}
          min={bind.min}
          max={bind.max}
          step={bind.step}
          onValueChange={onChange}
          className="w-[50px] h-8 rounded-md px-2 shrink-0"
        />
      </div>
    );
  }

  if ('options' in bind) {
    return (
      <div key={key} className="flex flex-row gap-2.5">
        <div className="w-[80px] flex items-center shrink-0 min-w-0">
          <Label
            htmlFor={key}
            className="truncate text-current/80 block leading-[1.2]"
          >
            {key}
          </Label>
        </div>

        <Select
          value={bind.value.toString()}
          onValueChange={(v) => onChange(Number(v))}
        >
          <SelectTrigger
            id={key}
            className="flex-1 !h-8 rounded-md px-2 shrink-0"
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="dark:bg-secondary dark:text-muted-foreground bg-muted text-muted-foreground">
            {Object.entries(bind.options).map(([optKey, value]) => (
              <SelectItem
                key={optKey}
                value={value.toString()}
                className="!h-8"
              >
                {optKey}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div key={key} className="flex flex-row gap-2.5">
      <div className="w-[80px] truncate flex items-center shrink-0 min-w-0">
        <Label
          htmlFor={key}
          className="truncate text-current/80 block leading-[1.2]"
        >
          {key}
        </Label>
      </div>

      <NumericInput
        id={key}
        value={bind.value}
        onValueChange={onChange}
        className="w-full h-8 rounded-md px-2"
      />
    </div>
  );
};

/**
 * Renders string bindings — as input or select if options exist.
 */
const renderString = (
  key: string,
  bind: BindString,
  onChange: (value: string | number | boolean) => void,
) => {
  if (bind.options) {
    return (
      <div key={key} className="flex flex-row gap-2.5">
        <div className="w-[80px] truncate flex items-center shrink-0 min-w-0">
          <Label
            htmlFor={key}
            className="truncate text-current/80 block leading-[1.2]"
          >
            {key}
          </Label>
        </div>

        <Select
          value={String(bind.value)}
          onValueChange={(v) => {
            const realValue = Object.values(bind.options ?? {}).find(
              (opt) => String(opt) === v,
            );
            onChange(realValue ?? v);
          }}
        >
          <SelectTrigger
            id={key}
            className="flex-1 !h-8 rounded-md px-2 shrink-0"
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="dark:bg-secondary dark:text-muted-foreground bg-muted text-muted-foreground">
            {Object.entries(bind.options).map(([optKey, value]) => (
              <SelectItem key={optKey} value={String(value)} className="!h-8">
                {optKey}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div key={key} className="flex flex-row gap-2.5">
      <div className="w-[80px] truncate flex items-center shrink-0 min-w-0">
        <Label
          htmlFor={key}
          className="truncate text-current/80 block leading-[1.2]"
        >
          {key}
        </Label>
      </div>
      <Input
        id={key}
        value={bind.value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 rounded-md px-2"
      />
    </div>
  );
};

/**
 * Renders boolean bindings as switches.
 */
const renderBoolean = (
  key: string,
  bind: BindBoolean,
  onChange: (value: boolean) => void,
) => (
  <div key={key} className="flex flex-row gap-2.5 justify-between">
    <div className="w-[80px] flex items-center shrink-0 min-w-0">
      <Label
        htmlFor={key}
        className="truncate text-current/80 block leading-[1.2]"
      >
        {key}
      </Label>
    </div>
    <Switch id={key} checked={bind.value} onCheckedChange={onChange} />
  </div>
);

/**
 * Determines which renderer to use based on the bind type.
 */
const renderBind = (
  key: string,
  bind: Bind,
  onChange: (value: unknown) => void,
) => {
  if (!('value' in bind)) return null;

  switch (typeof bind.value) {
    case 'number':
      return renderNumber(
        key,
        bind as BindNumber,
        onChange as (v: number) => void,
      );
    case 'string':
      return renderString(key, bind as BindString, onChange);
    case 'boolean':
      return renderBoolean(
        key,
        bind as BindBoolean,
        onChange as (v: boolean) => void,
      );
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                             Rendering Helpers                              */
/* -------------------------------------------------------------------------- */

const renderFlatBinds = (
  binds: FlatBinds,
  onBindsChange: (binds: FlatBinds) => void,
): React.ReactNode => (
  <div className="bg-[var(--codeblock)] rounded-md flex flex-col gap-2 px-2 py-[7px]">
    {Object.entries(binds).map(([key, bind]) => (
      <React.Fragment key={key}>
        {renderBind(key, bind, (value) =>
          onBindsChange({ ...binds, [key]: { ...bind, value } } as FlatBinds),
        )}
      </React.Fragment>
    ))}
  </div>
);

const renderNestedBinds = (
  binds: NestedBinds,
  onBindsChange: (binds: NestedBinds) => void,
  initial: boolean,
): React.ReactNode[] =>
  Object.entries(binds).map(([groupKey, groupBind]) => (
    <Collapsible
      key={groupKey}
      defaultOpen
      className="flex flex-col not-first:pt-1 first:-mt-0.5"
    >
      <CollapsibleTrigger className="cursor-pointer w-full truncate flex items-center justify-between rounded-md p-2">
        <Label className="truncate text-accent-foreground font-semibold block leading-[1.2]">
          {groupKey}
        </Label>
        <ChevronsUpDown className="size-3.5 text-accent-foreground" />
      </CollapsibleTrigger>
      <CollapsibleContent {...(!initial ? { initial: false } : {})}>
        <div className="mt-1">
          {renderFlatBinds(groupBind, (updatedGroupBind) =>
            onBindsChange({ ...binds, [groupKey]: updatedGroupBind }),
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  ));

const renderBinds = (
  binds: Binds,
  onBindsChange: (binds: Binds) => void,
  initial: boolean,
) =>
  isNestedBinds(binds)
    ? renderNestedBinds(
        binds,
        onBindsChange as (b: NestedBinds) => void,
        initial,
      )
    : renderFlatBinds(binds, onBindsChange as (b: FlatBinds) => void);

/* -------------------------------------------------------------------------- */
/*                                  Tweakpane                                 */
/* -------------------------------------------------------------------------- */

/**
 * Tweakpane — a dynamic configuration UI supporting numbers, strings, booleans, and nested groups.
 */
const Tweakpane = ({ onBindsChange, ...props }: TweakpaneProps) => {
  const [localBinds, setLocalBinds] = React.useState<Binds>(
    'binds' in props ? props.binds : props.initialBinds,
  );
  const [initial, setInitial] = React.useState(false);

  const handleBindsChange = React.useCallback(
    (binds: Binds) => {
      setLocalBinds(binds);
      onBindsChange?.(binds);
    },
    [onBindsChange],
  );

  React.useEffect(() => {
    if ('binds' in props) setLocalBinds(props.binds);
    setTimeout(() => setInitial(true), 500);
  }, [props]);

  return (
    <div className="bg-transparent pl-0 p-1.5 size-full">
      <div className="overflow-y-auto bg-accent rounded-md p-1.5 size-full flex flex-col">
        {renderBinds(localBinds, handleBindsChange, initial)}
      </div>
    </div>
  );
};

export { Tweakpane, type TweakpaneProps, type Binds };

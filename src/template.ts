interface TemplateModel<T extends readonly string[]> {
    render: (variables: Record<T[number], string>) => string;
    fields: T;
}

const lostAndFoundVars = ["user", "object", "time_period"] as const;
const lostAndFoundTemplate: TemplateModel<typeof lostAndFoundVars> = {
    render: (variables): string => (`Hi ${variables.user},

This is an email notifying you that we have found ${variables.object} at the OCF. Please
pick up your items during our open hours [1] at the front desk. Note that we
can only guarantee that your items will be stored for ${variables.time_period}, after which
the item will be discarded or handed off in the appropriate manner.

[1] https://ocf.io/hours
`),
    fields: lostAndFoundVars,
};

const userVhostWarningVars = ["group", "username", "website"] as const;
const userVhostWarningTemplate: TemplateModel<typeof userVhostWarningVars> = {
    render: (variables): string => (`Hi ${variables.group},

The OCF volunteer staff team noticed that your group's website [1] may be
missing a "Hosted by OCF" banner [2] or the University-mandated "student
group disclaimer" [3]. All student group websites must display both
elements to comply with OCF virtual hosting policy and University domain
name policy. If your website isn't fully compliant, we will have to
temporarily disable it to comply with these requirements. We'll check back
in about two weeks, so please try to make any needed changes by then.

Your username is "${variables.username}".

If you've forgotten how to log in, instructions can be found here [4]. If
you've forgotten your password, you can reset it here [5].

Feel free to reply all to this email if you have any questions or if we can
help with making the change!

Thanks for flying OCF,
The friendly staff of 171 MLK Student Union

1. ${variables.website}
2. https://www.ocf.berkeley.edu/docs/services/vhost/#ocf_banner
3. https://www.ocf.berkeley.edu/docs/services/vhost/#disclaimer
4. https://www.ocf.berkeley.edu/docs/services/shell/
5. https://www.ocf.berkeley.edu/account/password/
`),
    fields: userVhostWarningVars,
}

export const all_templates = {
    "lost-and-found": lostAndFoundTemplate,
    "user-vhost-warning": userVhostWarningTemplate,
} as const;
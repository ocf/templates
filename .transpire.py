from pathlib import Path

from transpire.types import Image
from transpire.resources import Deployment, Service, Ingress
from transpire.utils import get_image_tag

name = "templates"


def objects():
    yield dep := Deployment(
        name="templates",
        image=get_image_tag("templates"),
        ports=[3000],
    )

    yield svc := Service(
        name="templates",
        selector=dep.get_selector(),
        port_on_pod=3000,
        port_on_svc=80,
    )

    yield Ingress.from_svc(
        svc=svc,
        host="templates.ocf.berkeley.edu",
        path_prefix="/",
    )


def images():
    yield Image(name="templates", path=Path("/"))


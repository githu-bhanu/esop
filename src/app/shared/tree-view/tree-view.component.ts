import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { TreeComponent, TreeNode } from '@circlon/angular-tree-component';

@Component({
  selector: 'esop-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  @ViewChild('tree') tree: TreeComponent;
  @Input() nodes: any[] = [];
  @Input() options: any = {
    useVirtualScroll: true,
    nodeHeight: 24,
    allowDrag: false,
    animateExpand: true
  };

  @Output() nodeSelected = new EventEmitter<TreeNode>();
  @Input() selectedHierarchyId: any = ''; // Input to receive the hierarchy_id for selection

  searchTerm: string = '';
  filteredNodes: any[] = [];
  selectedNodeId: any;

  originalNodes: any[] = [];

  ngOnInit(): void {
    if (this.selectedHierarchyId) {
      this.selectNodeById(this.selectedHierarchyId);
    }
    this.originalNodes = [...this.nodes];
    this.filteredNodes = [...this.originalNodes];
  }

  // Utility function to deep copy nodes
  deepCopyNodes(nodes: any[]): any[] {
    return JSON.parse(JSON.stringify(nodes)); // Deep copy of the node structure
  }

  // Handle search input change
  onSearchChange(term: string): void {
    this.searchTerm = term;
  
    if (!term) {
      this.filteredNodes = [...this.originalNodes];
      setTimeout(() => {
        this.tree.treeModel.update();
        this.tree.treeModel.collapseAll();
      }, 0);
    } else {
      this.filteredNodes = this.filterNodes(this.originalNodes, term.toLowerCase());
  
      setTimeout(() => {
        this.tree.treeModel.update();
        this.expandAllMatching(this.tree.treeModel.roots);
      }, 0);
    }
  }
  
  

  expandAllMatching(nodes: TreeNode[]): void {
    nodes.forEach(node => {
      const matches = node.data.name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const hasMatchingChild = node.children?.some(child => this.nodeOrChildrenMatch(child));
  
      if (matches || hasMatchingChild) {
        node.expand();
        if (node.children) {
          this.expandAllMatching(node.children);
        }
      }
    });
  }
  
  nodeOrChildrenMatch(node: TreeNode): boolean {
    const matches = node.data.name?.toLowerCase().includes(this.searchTerm.toLowerCase());
    const childMatches = node.children?.some(child => this.nodeOrChildrenMatch(child));
    return matches || childMatches;
  }
  

  // Recursively filter nodes and preserve the structure
  filterNodes(nodes: any[], term: string): any[] {
    return nodes
      .map(node => {
        const matches = node.name?.toLowerCase().includes(term);
        const children = node.children ? this.filterNodes(node.children, term) : [];
  
        if (matches || children.length) {
          return {
            ...node,
            children: children.length > 0 ? children : node.children // preserve original children
          };
        }
  
        return null;
      })
      .filter(n => n);
  }
  
  

  // Handle node activation (expanding or selecting a node)
  onNodeActivate(event: any): void {
    const node = event.node;
    this.selectedNodeId = node.data.id;
  
    if (node.hasChildren && !node.isExpanded) {
      node.toggleExpanded();
    }
  
    this.nodeSelected.emit(node);
  }

  nodeLabelClick(node: any) {
    if (node) {
      node.toggleExpanded();
    }
  }

  // Function to find and select a node by hierarchy_id
findAndSelectNode(nodes: any[], hierarchy_id: string): boolean {
  for (const node of nodes) {
    // Check if the current node matches the hierarchy_id
    if (node.hierarchy_id === hierarchy_id) {
      node.selected = true; // Mark the node as selected
      return true; // Node found
    }

    // If the node has children, search recursively
    if (node.children && node.children.length > 0) {
      const found = this.findAndSelectNode(node.children, hierarchy_id);
      if (found) {
        node.expanded = true; // Expand the parent node
        return true; // Node found in children
      }
    }
  }
  return false; // Node not found
}

// Function to handle selection by hierarchy_id
selectNodeById(hierarchy_id: string): void {
  // Reset selection and expansion
  this.resetTree(this.originalNodes);

  // Find and select the node
  const found = this.findAndSelectNode(this.originalNodes, hierarchy_id);

  if (found) {
    this.filteredNodes = [...this.originalNodes]; // Update the filtered nodes
  } else {
    console.warn('Node with hierarchy_id not found:', hierarchy_id);
  }
}

// Utility function to reset the tree (clear selection and collapse all nodes)
resetTree(nodes: any[]): void {
  for (const node of nodes) {
    node.selected = false;
    node.expanded = false;
    if (node.children && node.children.length > 0) {
      this.resetTree(node.children);
    }
  }
}
  
}
